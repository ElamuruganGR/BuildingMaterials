package com.building.materials.pojos;

import java.util.List;

public class PlasteringInputs {
    private Integer numberOfWalls;
    private List<Cube> wallsProperties;
    private Integer numberOfDoors;
    private List<Cube> doorsProperties;
    private Integer numberOfWindows;
    private List<Cube> windowsProperties;
    private PlasteringSurfaces plasteringSurfaces;
    private Ratio innerWallCSRatio;
    private Ratio outerWallCSRatio;
    private Ratio ceilingCSRatio;


    public Integer getNumberOfWalls() {
        return numberOfWalls;
    }

    public void setNumberOfWalls(Integer numberOfWalls) {
        this.numberOfWalls = numberOfWalls;
    }

    public List<Cube> getWallsProperties() {
        return wallsProperties;
    }

    public void setWallsProperties(List<Cube> wallsProperties) {
        this.wallsProperties = wallsProperties;
    }

    public Integer getNumberOfDoors() {
        return numberOfDoors;
    }

    public void setNumberOfDoors(Integer numberOfDoors) {
        this.numberOfDoors = numberOfDoors;
    }

    public List<Cube> getDoorsProperties() {
        return doorsProperties;
    }

    public void setDoorsProperties(List<Cube> doorsProperties) {
        this.doorsProperties = doorsProperties;
    }

    public Integer getNumberOfWindows() {
        return numberOfWindows;
    }

    public void setNumberOfWindows(Integer numberOfWindows) {
        this.numberOfWindows = numberOfWindows;
    }

    public List<Cube> getWindowsProperties() {
        return windowsProperties;
    }

    public void setWindowsProperties(List<Cube> windowsProperties) {
        this.windowsProperties = windowsProperties;
    }

    public PlasteringSurfaces getPlasteringSurfaces() {
        return plasteringSurfaces;
    }

    public void setPlasteringSurfaces(PlasteringSurfaces plasteringSurfaces) {
        this.plasteringSurfaces = plasteringSurfaces;
    }

    public Ratio getInnerWallCSRatio() {
        return innerWallCSRatio;
    }

    public void setInnerWallCSRatio(Ratio innerWallCSRatio) {
        this.innerWallCSRatio = innerWallCSRatio;
    }

    public Ratio getOuterWallCSRatio() {
        return outerWallCSRatio;
    }

    public void setOuterWallCSRatio(Ratio outerWallCSRatio) {
        this.outerWallCSRatio = outerWallCSRatio;
    }

    public Ratio getCeilingCSRatio() {
        return ceilingCSRatio;
    }

    public void setCeilingCSRatio(Ratio ceilingCSRatio) {
        this.ceilingCSRatio = ceilingCSRatio;
    }
}
