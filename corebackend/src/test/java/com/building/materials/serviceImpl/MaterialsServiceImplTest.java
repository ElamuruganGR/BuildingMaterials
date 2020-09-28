package com.building.materials.serviceImpl;

import com.building.materials.constants.Constants;
import com.building.materials.daoImpl.MaterialsDaoImpl;
import com.building.materials.enumeration.EnumUnitsLabel;
import com.building.materials.pojos.*;

import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.OngoingStubbing;

import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class MaterialsServiceImplTest {

//    @InjectMocks
//    private MaterialsServiceImpl classUnderTest;

    @Mock
    private MaterialsDaoImpl materialsDaoImplMock;

    @Mock
    private TodaysCostOfMaterials todaysCostOfMaterialsMock;

    @Mock
    private Constants constantsMock;

    private List<QuantityAndCost> quantityAndCostOfWallList(){
        List<QuantityAndCost> quantityAndCostList = new ArrayList<>();
        QuantityAndCost bricksQAC = new QuantityAndCost("Bricks", 15630.0f, "bricks", 234450.0f);
        QuantityAndCost cementQAC = new QuantityAndCost("Cement", 53.086105f, "bags", 23888.748f);
        QuantityAndCost sandQAC = new QuantityAndCost("Sand", 3.9018283f, "units", 42920.11f);
        quantityAndCostList.add(bricksQAC);
        quantityAndCostList.add(cementQAC);
        quantityAndCostList.add(sandQAC);

        return quantityAndCostList;

    }

    @Test
    public void testGetQuantityAndCostOfWall_WithSuperConstants() {
        MaterialsServiceImpl classUnderTest = spy(new MaterialsServiceImpl(materialsDaoImplMock, todaysCostOfMaterialsMock));
        WallComponentsInputs wallComponentsInputsMock = mock(WallComponentsInputs.class);
//        MaterialsServiceImpl classUnderTest2 = spy(MaterialsServiceImpl.class);
//        classUnderTest2.setMaterialsDaoImpl(materialsDaoImplMock);
//        classUnderTest2.setTodaysCostOfMaterials(todaysCostOfMaterialsMock);
        Cube brickProps = new Cube(9,4,3);
        Cube wallProps = new Cube(168.25f, 0.75f, 9.75f);
        Cube brickWithMortar = new Cube(9.5f,4.5f,3.5f);
        WallMiscProps wallMisc = new WallMiscProps(0.5f, 10, 1, 6);

        //Given

        List<Cube> list = new ArrayList<>();
        list.add(brickWithMortar);
        list.add(wallProps);
        ArgumentCaptor<Cube> cubeArgCaptor = ArgumentCaptor.forClass(Cube.class);
        float volumeOfWallInFeet = 1230.3281f;
        float volumeOfOneBrickWithMortar = 149.625f;
        float volumeOfOneBrickInFeet = 0.0625f;
        float ciToCftConversionFactor = 1728;
        float volumeOfOneBrickWithMortarInCFT = volumeOfOneBrickWithMortar/ciToCftConversionFactor;
        System.out.println("Test :"+volumeOfOneBrickWithMortarInCFT);

        doReturn(brickProps).when(wallComponentsInputsMock).getBrickProperties();
        doReturn(wallProps).when(wallComponentsInputsMock).getWallProperties();
        doReturn(wallMisc).when(wallComponentsInputsMock).getWallMisc();

        doReturn(volumeOfOneBrickInFeet).when(materialsDaoImplMock).calculateVolumeOfCubeFromXtoCFT(brickProps, EnumUnitsLabel.CUBIC_INCHES);
        doReturn(ciToCftConversionFactor).when((Constants)classUnderTest).getCiToCftConversionFactor();
        doReturn(volumeOfOneBrickWithMortar).doReturn(volumeOfWallInFeet).when(materialsDaoImplMock).calculateVolumeOfCube(anyObject());
        doReturn(quantityAndCostOfWallList()).when(materialsDaoImplMock).getQuantityAndCostOfWall(volumeOfWallInFeet, volumeOfOneBrickWithMortarInCFT, volumeOfOneBrickInFeet, wallMisc, todaysCostOfMaterialsMock);

        //When
        List<QuantityAndCost> quantityAndCostOfWall = classUnderTest.getQuantityAndCostOfWall(wallComponentsInputsMock, todaysCostOfMaterialsMock);

        //Then
        verify(materialsDaoImplMock, times(2)).calculateVolumeOfCube(cubeArgCaptor.capture());
        Assertions.assertThatObject(cubeArgCaptor.getAllValues()).isEqualToComparingOnlyGivenFields(list);
        org.junit.jupiter.api.Assertions.assertEquals(quantityAndCostOfWallList().size(), quantityAndCostOfWall.size());
        Assertions.assertThatObject(quantityAndCostOfWallList()).isEqualToComparingOnlyGivenFields(quantityAndCostOfWall);
    }

    @Test
    public void getQuantityAndCostOfPlastering() {

        MaterialsServiceImpl classUnderTest = spy(new MaterialsServiceImpl(materialsDaoImplMock, todaysCostOfMaterialsMock));
//        MaterialsServiceImpl classUnderTest = new MaterialsServiceImpl(materialsDaoImplMock, todaysCostOfMaterialsMock);
//        MaterialsServiceImpl classUnderTest = PowerMockito.mock(MaterialsServiceImpl.class);
        PlasteringInputs plasteringInputsMock = mock(PlasteringInputs.class);
        ArgumentCaptor<List<Cube>> listArgCaptor = ArgumentCaptor.forClass(List.class);
        ArgumentCaptor<Float> areaArgCaptor = ArgumentCaptor.forClass(Float.class);
        ArgumentCaptor<Float> thicknessArgCaptor = ArgumentCaptor.forClass(Float.class);

        List<Cube> innerWallsProperties = new ArrayList<Cube>(){
            {
                add(new Cube(8, (float) 0.75,11));
                add(new Cube(8, (float) 0.75,11));
                add(new Cube(8, (float) 0.75,11));
                add(new Cube(8, (float) 0.75,11));
            }
        };
        List<Cube> outerWallsProperties = new ArrayList<Cube>(){
            {
                add(new Cube((float) 8.75,(float) 0.75,11));
                add(new Cube((float)8.75, (float)0.75,11));
                add(new Cube((float)8.75,(float)0.75,11));
                add(new Cube((float)8.75,(float)0.75,11));
            }
        };
        List<Cube> doorsProperties = new ArrayList<Cube>(){
            {
                new Cube(3,0,8);
                new Cube(3,0,8);
            }
        };
        List<Cube> windowsProperties = new ArrayList<Cube>(){
            {
                add(new Cube(3,0,4));
                add(new Cube(3,0,4));
            }
        };
        PlasteringSurfaces plasteringSurfaces = new PlasteringSurfaces(10,12,20);
        float areaOfDoors = 48;
        float areaOfWindows = 24;
        float areaOfInnerWalls = 352;
        float areaOfOuterWalls = 385;

        when(plasteringInputsMock.getWallsProperties()).thenReturn(innerWallsProperties);
        when(plasteringInputsMock.getDoorsProperties()).thenReturn(doorsProperties);
        when(plasteringInputsMock.getWindowsProperties()).thenReturn(windowsProperties);
        when(plasteringInputsMock.getPlasteringSurfaces()).thenReturn(plasteringSurfaces);
        when(classUnderTest.getOuterWallProperties(innerWallsProperties)).thenReturn(outerWallsProperties);


        when(materialsDaoImplMock.calculateAreaOfListOfCubes(doorsProperties)).thenReturn(areaOfDoors);
        when(materialsDaoImplMock.calculateAreaOfListOfCubes(windowsProperties)).thenReturn(areaOfWindows);
        when(materialsDaoImplMock.calculateAreaOfListOfCubes(innerWallsProperties)).thenReturn(areaOfInnerWalls);
        when(materialsDaoImplMock.calculateAreaOfListOfCubes(outerWallsProperties)).thenReturn(areaOfOuterWalls);


        // Areas of all complete InnerWalls and all complete Outer walls excluding areas of all doors and all windows
        float areaOfCompleteInnerWalls = areaOfInnerWalls - (areaOfDoors + areaOfWindows);
//        float areaOfCompleteOuterWalls = areaOfOuterWalls - (areaOfDoors + areaOfWindows);

        // Volume of Complete Ceiling, all complete Inner walls, all complete Outer walls
        /*Cube ceiling = new Cube(innerWallsProperties.get(0).getLength(),
                plasteringInputs.getPlasteringSurfaces().getCeilingPlasterThickness()/12,
                innerWallsProperties.get(1).getLength());*/
        // VolumeOfMortarForCeiling
                when(materialsDaoImplMock.calculateVolumeOfListOfCubes(anyList())).thenReturn(53.333332f);

        // volumeOfMortarForCompleteInnerWall
                when(materialsDaoImplMock.calculateVolumeOfCube(areaOfCompleteInnerWalls,plasteringSurfaces.getInnerWallPlasterThickness()/12))
                        .thenReturn(280.0f);
        // volumeOfMortarForCompleteOuterWall -- unable to mock because outerWallProperties value is not mocked, instead it creates its own value from innerWallProperties
                /*when(materialsDaoImplMock.calculateVolumeOfCube(areaOfCompleteOuterWalls,plasteringSurfaces.getOuterWallPlasterThickness()/12))
                .thenReturn(521.6666f);*/
        // plasteringQuantityAndCost
                when(materialsDaoImplMock.getQuantityAndCostOfPlastering(any(PlasteringInputs.class), anyFloat(),anyFloat(), anyFloat(), any(TodaysCostOfMaterials.class)))
                .thenReturn(quantityAndCostOfPlastering());

            List<QuantityAndCost> result = classUnderTest.getQuantityAndCostOfPlastering(plasteringInputsMock, todaysCostOfMaterialsMock);

            verify(materialsDaoImplMock,times(4)).calculateAreaOfListOfCubes(listArgCaptor.capture());
       org.junit.jupiter.api.Assertions.assertEquals(listArgCaptor.getAllValues().size(), 4);
        Assertions.assertThatObject(listArgCaptor.getAllValues()).isEqualToComparingOnlyGivenFields(new ArrayList<List<Cube>>() {
            {
                add(doorsProperties);
                add(windowsProperties);
                add(innerWallsProperties);
                add(outerWallsProperties);
            }
        });
        verify(materialsDaoImplMock, times(1)).calculateVolumeOfListOfCubes(listArgCaptor.capture());
        Assertions.assertThat(listArgCaptor).isEqualToComparingOnlyGivenFields(new ArrayList<Cube>(){{add(new Cube(8, (float) 0.8333333,8));}});

        verify(materialsDaoImplMock, times(2)).calculateVolumeOfCube(areaArgCaptor.capture(), thicknessArgCaptor.capture());
        Assertions.assertThatObject(thicknessArgCaptor.getAllValues()).isEqualToComparingOnlyGivenFields(Arrays.asList(1,1.6666666f));
        System.out.println("==="+areaArgCaptor.getAllValues()+"===");
        System.out.println("==="+thicknessArgCaptor.getAllValues()+"===");
       /* verify(materialsDaoImplMock).calculateVolumeOfCube(, )
        float volumeOfMortarForCompleteInnerWall = materialsDaoImpl.calculateVolumeOfCube(areaOfCompleteInnerWalls,
                plasteringSurfaces.getInnerWallPlasterThickness()/12);
        float volumeOfMortarForCompleteOuterWall = materialsDaoImpl.calculateVolumeOfCube(areaOfCompleteOuterWalls,
                plasteringSurfaces.getOuterWallPlasterThickness()/12);
       */
            Assertions.assertThatObject(quantityAndCostOfPlastering()).isEqualToComparingOnlyGivenFields(result);
    }

    private List<QuantityAndCost> quantityAndCostOfPlastering(){
        return new ArrayList<QuantityAndCost>(){
            {
                add(new QuantityAndCost("Cement", 143.15918f, "bag(s)", 64421.637f));
                add(new QuantityAndCost("Sand", 9.6178f, "unit(s)", 105795.8f));
            }
        };
    }
}

