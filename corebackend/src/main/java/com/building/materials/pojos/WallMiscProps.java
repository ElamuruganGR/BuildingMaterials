package com.building.materials.pojos;

public class WallMiscProps {
    private float mortarThickness;
    private float bricksWastagePercent = 0;
    private float cementInCSM = 0;
    private float sandInCSM = 0;
    private float totalPartsInCSM = 0;

    //Constructors
    public WallMiscProps(){

    }
    public WallMiscProps(float mortarThickness, float bricksWastagePercent,
                         float cementInCSM, float sandInCSM){
        this.mortarThickness = mortarThickness;
        this.bricksWastagePercent = bricksWastagePercent;
        this.cementInCSM = cementInCSM;
        this.sandInCSM = sandInCSM;
        this.totalPartsInCSM = this.cementInCSM+this.sandInCSM;
    }

    //Getters and Setters
    public float getMortarThickness() {
        return mortarThickness;
    }

    public void setMortarThickness(float mortarThickness) {
        this.mortarThickness = mortarThickness;
    }

    public float getBricksWastagePercent() {
        return bricksWastagePercent;
    }

    public void setBricksWastagePercent(float bricksWastagePercent) {
        this.bricksWastagePercent = bricksWastagePercent /100;
    }

    public float getCementInCSM() {
        return cementInCSM;
    }

    public void setCementInCSM(float cementInCSM) {
        this.cementInCSM = cementInCSM;
    }

    public float getSandInCSM() {
        return sandInCSM;
    }

    public void setSandInCSM(float sandInCSM) {
        this.sandInCSM = sandInCSM;
    }

    public float getTotalPartsInCSM() {
        return totalPartsInCSM;
    }

    public void setTotalPartsInCSM(float totalPartsInCSM) {
        if(totalPartsInCSM != 0) {
            this.totalPartsInCSM = totalPartsInCSM;
        } else {
            this.totalPartsInCSM = this.cementInCSM + this.sandInCSM;
        }
    }

    @Override
    public String toString() {
        return "\n\tMortarThickness: "+this.mortarThickness
                +"BricksWastage%: "+this.bricksWastagePercent
                + "CementInCSM: "+this.cementInCSM
                + "SandInCSM: "+this.sandInCSM
                + "TotalPartsInCSM: "+this.totalPartsInCSM;
    }
}
