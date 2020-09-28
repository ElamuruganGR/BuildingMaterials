package com.building.materials.dao;

import com.building.materials.enumeration.EnumUnitsLabel;
import com.building.materials.pojos.*;

import java.util.List;

public interface MaterialsDao {
    float calculateVolumeOfCube(Cube brickCube);

    float calculateVolumeOfCube(float area, float thickness);

    float calculateVolumeOfCubeFromXtoCFT(Cube cubeComponent, EnumUnitsLabel unitX);

    float calculateVolumeOfListOfCubesFromXtoCFT(List<Cube> componentsProperties, EnumUnitsLabel unitX);

    float calculateVolumeOfListOfCubes(List<Cube> asList);

    float calculateAreaOfListOfCubes(List<Cube> componentsProperties);

    float getCementQuantityInKG(Ratio innerWallCSRatio, float volumeOfMortarForCompleteInnerWall);

    float getSandQuantityInUnits(Ratio innerWallCSRatio, float volumeOfMortarForCompleteInnerWall);

    List<QuantityAndCost> getCementSandQuantityAndCost(Ratio ratio, float volumeOfMortar,
                                                       TodaysCostOfMaterials todaysCostOfMaterials, String id);

    List<QuantityAndCost> getQuantityAndCostOfWall(float vw, float vobm, float vob, WallMiscProps wallMisc, TodaysCostOfMaterials todaysCostOfMaterials);

    List<QuantityAndCost> getQuantityAndCostOfPlastering(PlasteringInputs plasteringInputs,
                                                         float volumeOfMortarForCompleteInnerWall,
                                                         float volumeOfMortarForCompleteOuterWall,
                                                         float volumeOfMortarForCompleteCeiling,
                                                         TodaysCostOfMaterials todaysCostOfMaterials);

}
