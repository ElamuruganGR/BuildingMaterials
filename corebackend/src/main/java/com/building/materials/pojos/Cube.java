package com.building.materials.pojos;

import org.springframework.stereotype.Component;

/**
 * This class refers to all cubical objects such as
 * Brick, Wall, Pillar
 */
@Component
public class Cube extends Object{
    private float length;
    private float width;
    private float height;
    public Cube() {

    }

    public Cube(float length, float width, float height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    public float getLength() {
        return length;
    }

    public void setLength(float length) {
        this.length = length;
    }

    public float getWidth() {
        return width;
    }

    public void setWidth(float width) {
        this.width = width;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Length: "+this.length+", Width: "+this.width +", height :"+this.height;
    }

    public Cube clone(){
        Cube newCube = new Cube(this.getLength(),this.getWidth(),this.getHeight());
        return newCube;
    }

}
