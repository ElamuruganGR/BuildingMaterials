package com.building.materials.controller;

import com.building.materials.exceptions.InvalidAmountException;
import com.building.materials.pojos.PlasteringInputs;
import com.building.materials.pojos.QuantityAndCost;
import com.building.materials.pojos.TodaysCostOfMaterials;
import com.building.materials.pojos.WallComponentsInputs;
import com.building.materials.service.MaterialsService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class MaterialsController extends BaseController{

    @Autowired
    private TodaysCostOfMaterials todaysCostOfMaterials;
    @Autowired
    @Qualifier("materialsServiceImpl")
    private MaterialsService materialsServiceImpl;
    @Value("${greeting}")
    private String welcome;

    private static final Logger logger = LogManager.getLogger(MaterialsController.class);

    @PostMapping("/todaysCost")
    public String todaysCost( @RequestBody TodaysCostOfMaterials todaysCost){
        logger.info("MaterialsController.todaysCost()");
        logger.warn("MaterialsController.todaysCost()");
        logger.trace("MaterialsController.todaysCost()");
        logger.error("MaterialsController.todaysCost()");
        System.out.println("MaterialsController.todaysCost()");
        if(todaysCost.getBrick()==0 || todaysCost.getCement()==0 || todaysCost.getSand()==0 || todaysCost.getCrushedStones()==0){
            throw new InvalidAmountException("One or more material cost is zero");
        }
        todaysCostOfMaterials = todaysCost;

        System.out.println(todaysCostOfMaterials.toString());
        System.out.println("Today's Materials Cost is updated successfully");

        return (todaysCostOfMaterials != null) ? "Today's Materials Cost is updated successfully" : null;
    }

    @PostMapping("/qcWall")
    public List<QuantityAndCost> quantityAndCostOfMaterialsForWall(@RequestBody WallComponentsInputs wallComponentsInputs){

        System.out.println("MaterialsController.quantityAndCostOfMaterialsForWall()");
        System.out.println(wallComponentsInputs.toString());
        System.out.println(this.todaysCostOfMaterials.toString());

        return materialsServiceImpl.getQuantityAndCostOfWall(wallComponentsInputs, this.todaysCostOfMaterials);
    }

    @PostMapping("/qcPlastering")
    public List<QuantityAndCost> quantityAndCostOfPlastering(@RequestBody PlasteringInputs plasteringInputs){

        System.out.println("MaterialsController.quantityAndCostOfPlastering");
        System.out.println(plasteringInputs.toString());
        System.out.println(this.todaysCostOfMaterials.toString());

        return materialsServiceImpl.getQuantityAndCostOfPlastering(plasteringInputs, this.todaysCostOfMaterials);
    }
}
