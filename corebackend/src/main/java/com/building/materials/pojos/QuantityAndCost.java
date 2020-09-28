package com.building.materials.pojos;

import org.springframework.stereotype.Component;

@Component
public class QuantityAndCost {

    private String id;
    private float quantityRequired;
    private String quantityUnit;
    private float cost;

    public QuantityAndCost() {

    }

    public QuantityAndCost(String id, float quantityRequired, String quantityUnit,  float cost) {
        this.id = id;
        this.quantityRequired = quantityRequired;
        this.quantityUnit = quantityUnit;
        this.cost = cost;
    }

    public QuantityAndCost(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(float quantityRequired) {
        this.quantityRequired = quantityRequired;
    }

    public String getQuantityUnit() {
        return quantityUnit;
    }

    public void setQuantityUnit(String quantityUnit) {
        this.quantityUnit = quantityUnit;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    @Override
    public String toString() {
        return "Id:"+id+" Quantity:"+quantityRequired+" Quantity unit:"+quantityUnit+" cost:"+cost;
    }
}
