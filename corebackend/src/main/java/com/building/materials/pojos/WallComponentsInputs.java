package com.building.materials.pojos;

public class WallComponentsInputs {
    private Cube brickProperties;
    private Cube wallProperties;
    private WallMiscProps wallMisc;

    //Constructors
    public WallComponentsInputs(){

    }
    public WallComponentsInputs(Cube brickProperties, Cube wallProperties,
                                WallMiscProps wallMisc){
        this.brickProperties = brickProperties;
        this.wallProperties = wallProperties;
        this.wallMisc = wallMisc;
    }

    //Getters and Setters
    public Cube getBrickProperties() {
        return brickProperties;
    }

    public void setBrickProperties(Cube brickProperties) {
        this.brickProperties = brickProperties;
    }

    public Cube getWallProperties() {
        return wallProperties;
    }

    public void setWallProperties(Cube wallProperties) {
        this.wallProperties = wallProperties;
    }

    public WallMiscProps getWallMisc() {
        return wallMisc;
    }

    public void setWallMisc(WallMiscProps wallMisc) {
        this.wallMisc = wallMisc;
    }

    @Override
    public String toString() {
        return "Wall:"+"\n\tBrickCube:\n\t\t"+this.brickProperties.toString()
                +"\n\tWallCube:\n\t\t"+this.wallProperties.toString()
                +"\n\tMiscellenous: "+this.wallMisc.toString();
    }
}
