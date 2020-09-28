package com.building.materials.pojos;

public class PlasteringSurfaces {
    private float ceilingPlasterThickness;
    private float innerWallPlasterThickness;
    private float outerWallPlasterThickness;

    public PlasteringSurfaces() {
    }

    public PlasteringSurfaces(float ceilingPlasterThickness, float innerWallPlasterThickness, float outerWallPlasterThickness) {
        this.ceilingPlasterThickness = ceilingPlasterThickness;
        this.innerWallPlasterThickness = innerWallPlasterThickness;
        this.outerWallPlasterThickness = outerWallPlasterThickness;
    }

    public float getCeilingPlasterThickness() {
        return ceilingPlasterThickness;
    }

    public void setCeilingPlasterThickness(float ceilingPlasterThickness) {
        this.ceilingPlasterThickness = ceilingPlasterThickness;
    }

    public float getInnerWallPlasterThickness() {
        return innerWallPlasterThickness;
    }

    public void setInnerWallPlasterThickness(float innerWallPlasterThickness) {
        this.innerWallPlasterThickness = innerWallPlasterThickness;
    }

    public float getOuterWallPlasterThickness() {
        return outerWallPlasterThickness;
    }

    public void setOuterWallPlasterThickness(float outerWallPlasterThickness) {
        this.outerWallPlasterThickness = outerWallPlasterThickness;
    }

    @Override
    public String toString() {
        return "object:"+super.toString()+
                "ceilingPlasterThickness:"+this.getCeilingPlasterThickness()+
                "innerWallPlasterThickness:"+this.getInnerWallPlasterThickness()+
                "outerWallPlasterThickness"+this.getOuterWallPlasterThickness();
    }

}
