package com.building.materials.serviceImpl;

import com.building.materials.constants.Constants;
import com.building.materials.dao.MaterialsDao;
import com.building.materials.daoImpl.MaterialsDaoImpl;
import com.building.materials.enumeration.EnumUnitsLabel;
import com.building.materials.pojos.*;
import com.building.materials.service.MaterialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MaterialsServiceImpl extends Constants implements MaterialsService {

    @Autowired
    @Qualifier("materialsDaoImpl")
    private MaterialsDao materialsDaoImpl;

    @Autowired
    private TodaysCostOfMaterials todaysCostOfMaterials;

    public MaterialsServiceImpl() {
    }

    public MaterialsServiceImpl(MaterialsDaoImpl materialsDaoImpl, TodaysCostOfMaterials todaysCostOfMaterials){
        this.materialsDaoImpl = materialsDaoImpl;
        this.todaysCostOfMaterials = todaysCostOfMaterials;
    }
    /**
     *
     * @param wallComponentsInputs - Json input from UI for wall
     * @param todaysCostOfMaterials - Today's cost of Brick, Cement and Sand
     * @return QuantityAndCostOfWall
     */
    @Override
    public List<QuantityAndCost> getQuantityAndCostOfWall(WallComponentsInputs wallComponentsInputs,
                                                          TodaysCostOfMaterials todaysCostOfMaterials) {
        System.out.println("MaterialsServiceImpl.getQuantityAndCostOfWall()");
        List<QuantityAndCost> wallQuantityAndCost = new ArrayList<>();
        //DeStructuring wall inputs
        Cube brickProperties = wallComponentsInputs.getBrickProperties();
        Cube wallProperties = wallComponentsInputs.getWallProperties();
        WallMiscProps wallMisc = wallComponentsInputs.getWallMisc();
        float mortarThickness = wallMisc!=null ? wallMisc.getMortarThickness() : 0;
        Optional<Cube> brickWithMortarOptional = Optional.of(brickProperties.clone());
        brickWithMortarOptional.map((brick) -> {
            brick.setLength(brick.getLength() + mortarThickness);
            brick.setWidth(brick.getWidth() + mortarThickness);
            brick.setHeight(brick.getHeight() + mortarThickness);
            return brick;
        });

    // Calculating volume of oneBrick, oneBrickWithMortar and wall
        float volumeOfOneBrickInFeet = materialsDaoImpl.calculateVolumeOfCubeFromXtoCFT(brickProperties, EnumUnitsLabel.CUBIC_INCHES);
//        float conversionFactor = getCiToCftConversionFactor();
        float volumeOfOneBrickWithMortar = materialsDaoImpl.calculateVolumeOfCube(brickWithMortarOptional.get())/getCiToCftConversionFactor();
        /*float volumeOfOneBrickWithMortar = materialsDaoImpl.calculateVolumeOfListOfCubesFromXtoCFT(new ArrayList<Cube>(){{add(brickWithMortarOptional.get());}},
                                                                EnumUnitsLabel.CUBIC_INCHES);*/
        float volumeOfWallInFeet = materialsDaoImpl.calculateVolumeOfCube(wallProperties);
        System.out.println("volumeOfOneBrickInFeet : "+volumeOfOneBrickInFeet+" volumeOfWallInFeet : "+volumeOfWallInFeet+
                " volumeOfOneBrickWithMortar : "+volumeOfOneBrickWithMortar);

    // Calculating Quantity and Cost of Wall
        wallQuantityAndCost = materialsDaoImpl.getQuantityAndCostOfWall(volumeOfWallInFeet, volumeOfOneBrickWithMortar, volumeOfOneBrickInFeet, wallMisc, todaysCostOfMaterials);

        return wallQuantityAndCost;
    }

    /**
     *
     * @param plasteringInputs - Json input from UI for Plastering
     * @param todaysCostOfMaterials - Today's cost of Brick, Cement and Sand
     * @return quantityAndCostOfPlastering
     */
    @Override
    public List<QuantityAndCost> getQuantityAndCostOfPlastering(PlasteringInputs plasteringInputs,
                                                                TodaysCostOfMaterials todaysCostOfMaterials) {
        System.out.println("MaterialsServiceImpl.getQuantityAndCostOfPlastering");
        List<QuantityAndCost> plasteringQuantityAndCost = new ArrayList<>();

    //DeStructuring plastering inputs
        List<Cube> innerWallsProperties = plasteringInputs.getWallsProperties();
        //--------------Shallow Copy of List--------------------------
        //List<Cube> outerWallsProperties = new ArrayList<>(plasteringInputs.getWallsProperties());
        //--------------Deep Copy of List-----------------------------
        List<Cube> outerWallsProperties = getOuterWallProperties(innerWallsProperties);
        List<Cube> doorsProperties = plasteringInputs.getDoorsProperties();
        List<Cube> windowsProperties = plasteringInputs.getWindowsProperties();
        PlasteringSurfaces plasteringSurfaces = plasteringInputs.getPlasteringSurfaces();

    // Areas of all Doors, all Windows and all Inner walls and all Outer walls
        float areaOfDoors = materialsDaoImpl.calculateAreaOfListOfCubes(doorsProperties);
        float areaOfWindows = materialsDaoImpl.calculateAreaOfListOfCubes(windowsProperties);
        float areaOfInnerWalls = materialsDaoImpl.calculateAreaOfListOfCubes(innerWallsProperties);
        float areaOfOuterWalls = materialsDaoImpl.calculateAreaOfListOfCubes(outerWallsProperties);
        System.out.println("AreaOfDoors:"+areaOfDoors+" AreaOfWindows:"+areaOfWindows+
                " AreaOfInnerWalls:"+areaOfInnerWalls+" AreaOfOuterWalls:"+areaOfOuterWalls);

    // Areas of all complete InnerWalls and all complete Outer walls excluding areas of all doors and all windows
        float areaOfCompleteInnerWalls = areaOfInnerWalls - (areaOfDoors + areaOfWindows);
        float areaOfCompleteOuterWalls = areaOfOuterWalls - (areaOfDoors + areaOfWindows);
        System.out.println("AreaOfCompleteInnerWalls:"+areaOfCompleteInnerWalls+
                " AreaOfCOmpleteOuterWalls:"+areaOfCompleteOuterWalls);

    // Volume of Complete Ceiling, all complete Inner walls, all complete Outer walls
        Cube ceiling = new Cube(innerWallsProperties.get(0).getLength(),
                plasteringInputs.getPlasteringSurfaces().getCeilingPlasterThickness()/12,
                innerWallsProperties.get(1).getLength());
        System.out.println("CEILING:"+ceiling.toString());
        float volumeOfMortarForCompleteCeiling = materialsDaoImpl.calculateVolumeOfListOfCubes(Arrays.asList(ceiling));
        float volumeOfMortarForCompleteInnerWall = materialsDaoImpl.calculateVolumeOfCube(areaOfCompleteInnerWalls,
                plasteringSurfaces.getInnerWallPlasterThickness()/12);
        float volumeOfMortarForCompleteOuterWall = materialsDaoImpl.calculateVolumeOfCube(areaOfCompleteOuterWalls,
                plasteringSurfaces.getOuterWallPlasterThickness()/12);
        System.out.println("VolumeOfMortarForCompleteCeiling: "+volumeOfMortarForCompleteCeiling +
                " VolumeOfMortarForCompleteInnerWall: "+volumeOfMortarForCompleteInnerWall +
                " VolumeOfMortarForCompleteOuterWall: "+volumeOfMortarForCompleteOuterWall );

    // Calculating Quantity and Cost of Plastering
        plasteringQuantityAndCost = materialsDaoImpl.getQuantityAndCostOfPlastering(plasteringInputs, volumeOfMortarForCompleteInnerWall,
                volumeOfMortarForCompleteOuterWall, volumeOfMortarForCompleteCeiling, todaysCostOfMaterials);

        return plasteringQuantityAndCost;
    }

    public List<Cube> getOuterWallProperties(List<Cube> innerWallsProperties) {
        List<Cube> outerWallsProperties = innerWallsProperties.stream().map(innerWallPropeties -> {
            Cube outerWallProperty = new Cube();
            outerWallProperty.setLength(innerWallPropeties.getLength());
            outerWallProperty.setWidth(innerWallPropeties.getWidth());
            outerWallProperty.setHeight(innerWallPropeties.getHeight());
            return outerWallProperty;
        }).collect(Collectors.toList());
        outerWallsProperties.stream().forEach(wall -> wall.setLength(wall.getLength()+ wall.getWidth()));
        return outerWallsProperties;
    }

}

