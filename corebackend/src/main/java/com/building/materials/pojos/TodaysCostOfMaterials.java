package com.building.materials.pojos;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
public class TodaysCostOfMaterials {
    private float brick = 0;
    private float cement = 0;
    private float sand = 0;
    private float crushedStones = 0;

    public TodaysCostOfMaterials() {
    }

    public float getBrick() {
        return brick;
    }

    public void setBrick(float brick) {
        this.brick = brick;
    }

    public float getCement() {
        return cement;
    }

    public void setCement(float cement) {
        this.cement = cement;
    }

    public float getSand() {
        return sand;
    }

    public void setSand(float sand) {
        this.sand = sand;
    }

    public float getCrushedStones() {
        return crushedStones;
    }

    public void setCrushedStones(float crushedStones) {
        this.crushedStones = crushedStones;
    }

    @Override
    public String toString() {
        return "Today'sCost of Materials:"+"\n\tBrick: "+this.brick+", Cement: "+this.cement+", Sand: "+this.sand+", CrushedStones: "+this.crushedStones;
    }
}
