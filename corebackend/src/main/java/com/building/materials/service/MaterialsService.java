package com.building.materials.service;

import com.building.materials.pojos.PlasteringInputs;
import com.building.materials.pojos.QuantityAndCost;
import com.building.materials.pojos.TodaysCostOfMaterials;
import com.building.materials.pojos.WallComponentsInputs;

import java.util.List;

public interface MaterialsService {
    List<QuantityAndCost> getQuantityAndCostOfWall(WallComponentsInputs wallComponentsInputs, TodaysCostOfMaterials todaysCostOfMaterials);

    List<QuantityAndCost> getQuantityAndCostOfPlastering(PlasteringInputs plasteringInputs, TodaysCostOfMaterials todaysCostOfMaterials);
}
