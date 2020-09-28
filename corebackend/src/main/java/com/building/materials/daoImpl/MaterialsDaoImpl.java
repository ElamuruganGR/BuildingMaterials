package com.building.materials.daoImpl;

import com.building.materials.constants.Constants;
import com.building.materials.dao.MaterialsDao;
import com.building.materials.enumeration.EnumUnitsLabel;
import com.building.materials.helpers.MaterialsDaoImplHelper;
import com.building.materials.pojos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.BinaryOperator;

@Repository
public class MaterialsDaoImpl extends Constants implements MaterialsDao{

    @Autowired
    private MaterialsDaoImplHelper helper;

    /**
     *
     * @param cubeComponent - dimensions(length, width, height) should be in feet
     * @return volumeOfCube
     * @operation It calculates the volume of a component --> (l * b* h) in feet
     */
    @Override
    public float calculateVolumeOfCube(Cube cubeComponent) {
        System.out.println("MaterialsDaoImpl.calculateVolumeOfCube()");
        return (cubeComponent.getLength()*cubeComponent.getWidth()*cubeComponent.getHeight());
    }

    /**
     *
     * @param area - It is a product of (length and height)
     * @param thickness - It is the width
     * @return volumeOfCube
     * @operation It calculates the volume --> (area * width/thickness)
     */
    @Override
    public float calculateVolumeOfCube(float area, float thickness) {
        System.out.println("MaterialsDaoImpl.calculateVolumeOfCube()");
        return (float) (area*thickness);
    }

    /**
     *
     * @param cubeComponent - It has dimensions (length, width and height)
     * @param unitX - represents the units of Construction raw materials
     * @return volumeOfCubeFromXtoCFT
     * @operation It calculates the volume of cube and converts to CFT
     */

    public  float calculateVolumeOfCubeFromXtoCFT(Cube cubeComponent, EnumUnitsLabel unitX){
        System.out.println("MaterialsDaoImpl.volumeOfCubeFromInchesToFeet()");
        if(unitX.equals(EnumUnitsLabel.CUBIC_INCHES)) {
            return calculateVolumeOfCube(cubeComponent) / ciToCftConversionFactor;
        } else {
            return calculateVolumeOfCube(cubeComponent);
        }
    }

    @Override
    public  float calculateVolumeOfListOfCubesFromXtoCFT(List<Cube> componentsProperties, EnumUnitsLabel unitX){

        System.out.println("MaterialsDaoImpl.calculateVolumeOfListOfCubesFromXtoCFT");
        Optional<Float> totalVolumeOfListOfCubesOptional =
                componentsProperties.stream()
                                    .map(cube -> (cube.getLength() * cube.getWidth() * cube.getHeight()))
                                    .reduce((volume1, volume2) -> volume1 + volume2);

        if(totalVolumeOfListOfCubesOptional.isPresent()) {
            if(unitX.equals(EnumUnitsLabel.CUBIC_INCHES)) {
                return totalVolumeOfListOfCubesOptional.get() / ciToCftConversionFactor;
            }
            return totalVolumeOfListOfCubesOptional.get();
        }
        return 0;

    }

    /**
     * @param componentsProperties - This is a list of Cube
     * @return volumeOfCubesList
     * @operation It calculates the sum of volume of all cubes --> (l*b*h + l*b*h + l*b*h ....)
     */
    public float calculateVolumeOfListOfCubes(List<Cube> componentsProperties) {
        System.out.println("MaterialsDaoImpl.calculateAreaOfListOfCubes");
        Optional<Float> componentsAreaOptional =
                componentsProperties.stream()
                        .map(component ->
                                component.getLength() * component.getWidth() * component.getHeight())
                        .reduce((volume1, volume2) -> volume1 + volume2);
        if(componentsAreaOptional.isPresent()) {
            return componentsAreaOptional.get();
        }
        return 0;
    }

    /**
     *
     * @param componentsProperties - This is a List<Cube>
     * @return areaOfListOfCubes
     * @operation It calculates the sum of areas of all cubes(components) --> (l*h + l*h + l*h ...)
     */
    @Override
    public float calculateAreaOfListOfCubes(List<Cube> componentsProperties) {
        System.out.println("MaterialsDaoImpl.calculateAreaOfListOfCubes");
        Optional<Float> componentsAreaOptional =
                componentsProperties.stream().map(component ->
                        component.getLength() * component.getHeight()).reduce((area1, area2) -> area1 + area2);
        if(componentsAreaOptional.isPresent()) {
            return componentsAreaOptional.get();
        }
        return 0;
    }

    /**
     *
     * @param ratio - Cement : Sand
     * @param volumeOfMortar - Volume of a mixture which contains(Cement, sand and water)
     * @return cementQuantityInKG
     * @operation It calculates the KG(kilogram) of cement required to build a component
     */
    @Override
    public float getCementQuantityInKG(Ratio ratio, float volumeOfMortar) {
        System.out.println("MaterialsDao.getCementQuantityInKG");
        float cementRatio = helper.ratioWithTotalParts(ratio, "numerator");
        return cementRatio*volumeOfMortar*wetToDryConstantForMortar*densityOfCement/m3ToCftConversionFactor;
    }

    /**
     *
     * @param ratio - Cement : Sand
     * @param volumeOfMortar - Volume of a mixture which contains(Cement, sand and water)
     * @return sandQuantityInUnits
     * @operation It calculates the Units of sand required to build a component
     */
    @Override
    public float getSandQuantityInUnits(Ratio ratio, float volumeOfMortar) {
        System.out.println("MaterialsDao.getSandQuantityInUnits");
        float sandRatio = helper.ratioWithTotalParts(ratio, "denominator");
        return sandRatio*volumeOfMortar*wetToDryConstantForMortar;
    }

    /**
     *
     * @param ratio - Cement : Sand
     * @param volumeOfMortar - Volume of a mixture which contains(Cement, sand and water)
     * @param todaysCostOfMaterials - Today's cost of Brick, Cement, Sand, CrushedStones
     * @param componentName - Prefix value
     * @return cementSandQuantityAndCost
     * @operation It just sets the id, quantity and cost in QuantityAndCost Object
     */
    @Override
    public List<QuantityAndCost> getCementSandQuantityAndCost(Ratio ratio, float volumeOfMortar,
                                                              TodaysCostOfMaterials todaysCostOfMaterials, String componentName) {
        System.out.println("MaterialsDaoImpl.getCementSandQuantityAndCost()");
        List<QuantityAndCost> cementSandQuantityAndCost = new ArrayList<>();


        QuantityAndCost cementQuantityAndCost = new QuantityAndCost();
        cementQuantityAndCost.setId(componentName+cementLabel);
        cementQuantityAndCost.setQuantityRequired(getCementQuantityInKG(ratio,volumeOfMortar)/50);
        cementQuantityAndCost.setQuantityUnit(cementQuantityUnit);
        cementQuantityAndCost.setCost(cementQuantityAndCost.getQuantityRequired() * todaysCostOfMaterials.getCement());
        System.out.println("Cement quantity and cost : "+cementQuantityAndCost.toString());

        QuantityAndCost sandQuantityAndCost = new QuantityAndCost();
        sandQuantityAndCost.setId(componentName+sandLabel);
        sandQuantityAndCost.setQuantityRequired(getSandQuantityInUnits(ratio,volumeOfMortar)/100);
        sandQuantityAndCost.setQuantityUnit(sandQuantityUnit);
        sandQuantityAndCost.setCost(sandQuantityAndCost.getQuantityRequired() * todaysCostOfMaterials.getSand());
        System.out.println("Sand quantity and cost : "+sandQuantityAndCost.toString());

        cementSandQuantityAndCost.add(cementQuantityAndCost);
        cementSandQuantityAndCost.add(sandQuantityAndCost);

        return cementSandQuantityAndCost;
    }

    /**
     *
     * @param vw - volume of wall
     * @param vobm - volume of one brick with mortar
     * @param vob - volume of one brick
     * @param todaysCostOfMaterials - Today's cost of Brick, Cement, Sand, CrushedStones
     * @return quantityAndCostOfWall
     * @operation It calculates the quantity and cost of bricks(in numbers), cement(in kg) and sand(in unit)
     *            required for constructing a wall.
     */
    @Override
    public List<QuantityAndCost> getQuantityAndCostOfWall(float vw, float vobm, float vob, WallMiscProps wallMisc, TodaysCostOfMaterials todaysCostOfMaterials) {

        System.out.println("MaterialsDaoImpl.getQuantityAndCostOfWall()");
        List<QuantityAndCost> brickCementSandQuantityAndCost = new ArrayList<>();

    // Bricks calculation and inserted in list
        int bricksWithoutWastages = (int) Math.ceil(vw/vobm);
        int wastageBricks = (int) Math.ceil(wallMisc.getBricksWastagePercent() * bricksWithoutWastages);
        int bricksWithWastages = bricksWithoutWastages + wastageBricks;
        float volumeOfWetMortar = vw - (bricksWithoutWastages * vob);
        QuantityAndCost bricksQuantityAndCost = new QuantityAndCost(brickslabel ,bricksWithWastages, bricksQuantityUnit,  todaysCostOfMaterials.getBrick() * bricksWithWastages);
        System.out.println("Bricks quantity and Cost : "+bricksQuantityAndCost.toString());
        brickCementSandQuantityAndCost.add(bricksQuantityAndCost);

    // Cement and Sand Calculation and inserted in list
        Ratio cementRatio = new Ratio(wallMisc.getCementInCSM(), wallMisc.getSandInCSM());
        brickCementSandQuantityAndCost.addAll(getCementSandQuantityAndCost(cementRatio, volumeOfWetMortar, todaysCostOfMaterials, ""));

        return brickCementSandQuantityAndCost;
    }

    /**
     *
     * @param plasteringInputs - Json from UI for plastering
     * @param volumeOfMortarForCompleteInnerWall - volume of mortar for Inner wall excluding volume of doors and windows
     * @param volumeOfMortarForCompleteOuterWall - volume of mortar for Outer wall excluding volume of doors and windows
     * @param volumeOfMortarForCompleteCeiling - volume of mortar for ceiling excluding nothing
     * @param todaysCostOfMaterials - Today's cost of Brick, Cement, Sand, CrushedStones
     * @return quantityAndCostOfPlastering
     * @Operation It calculates the quantity and cost of cement(in kg) and sand(in unit)
     *            required for plastering of each components (Inner wall, Outer wall, Ceiling)
     */
    @Override
    public List<QuantityAndCost> getQuantityAndCostOfPlastering(PlasteringInputs plasteringInputs,
                                                                float volumeOfMortarForCompleteInnerWall,
                                                                float volumeOfMortarForCompleteOuterWall,
                                                                float volumeOfMortarForCompleteCeiling,
                                                                TodaysCostOfMaterials todaysCostOfMaterials) {
        System.out.println("MaterialsDaoImpl.getQuantityAndCostOfPlastering()");
        List<QuantityAndCost> cementSandQuantityAndCost = new ArrayList<>();

    // Calculating Quantity and Cost Of Cement and Sand
    // for
    // seperate Components (Inner wall, Outer Wall and Ceiling)
        List<QuantityAndCost> innerWallQuantityAndCost = getCementSandQuantityAndCost(
                plasteringInputs.getInnerWallCSRatio(), volumeOfMortarForCompleteInnerWall, todaysCostOfMaterials, "InnerWall");
        List<QuantityAndCost> outerWallQuantityAndCost = getCementSandQuantityAndCost(
                plasteringInputs.getOuterWallCSRatio(), volumeOfMortarForCompleteOuterWall, todaysCostOfMaterials, "OuterWall");
        List<QuantityAndCost> ceilingQuantityAndCost = getCementSandQuantityAndCost(
                plasteringInputs.getCeilingCSRatio(), volumeOfMortarForCompleteCeiling, todaysCostOfMaterials, "Ceiling");

    // Calculating Quantity and Cost of Cement and Sand
    // for
    // Plastering (Sum of Inner wall, Outer wall and Ceiling)
        QuantityAndCost cementQuantityAndCostForPlastering = helper.getComponentQuantityAndCostForPlastering(innerWallQuantityAndCost,
                outerWallQuantityAndCost,ceilingQuantityAndCost,"Cement");
        QuantityAndCost sandQuantityAndCostForPlastering = helper.getComponentQuantityAndCostForPlastering(innerWallQuantityAndCost,
                outerWallQuantityAndCost,ceilingQuantityAndCost,"Sand");

        cementSandQuantityAndCost.add(cementQuantityAndCostForPlastering);
        cementSandQuantityAndCost.add(sandQuantityAndCostForPlastering);

        return cementSandQuantityAndCost;
    }

}