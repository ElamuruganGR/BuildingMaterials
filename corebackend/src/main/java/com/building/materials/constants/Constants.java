package com.building.materials.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Constants {
    @Value("${bricksLabel}")
    public String brickslabel;

    @Value("${cementLabel}")
    public String cementLabel;

    @Value("${sandLabel}")
    public String sandLabel;

    @Value("${crushedStonesLabel}")
    public String crushedStonesLabel;

    @Value("${bricksQuantityUnit}")
    public String bricksQuantityUnit;

    @Value("${cementQuantityUnit}")
    public String cementQuantityUnit;

    @Value("${sandQuantityUnit}")
    public String sandQuantityUnit;

    @Value("${crushedStonesQuantityUnit}")
    public String crushedStonesQuantityUnit;

    @Value("${wetToDryConstantForConcrete}")
    public float wetToDryConstantForConcrete;

    @Value("${wetToDryConstantForMortar}")
    public float wetToDryConstantForMortar;

    @Value("${cementUnits}")
    public float cementUnits;

    @Value("${sandUnits}")
    public float sandUnits;

    @Value("${ciToCftConversionFactor}")
    public float ciToCftConversionFactor;

    @Value("${ciToCftConversionFactor}")
    public float test;

    @Value("${densityOfCement}")
    public float densityOfCement;

    @Value("${m3ToCftConversionFactor}")
    public float m3ToCftConversionFactor;

    public String getBrickslabel() {
        return brickslabel;
    }

    public void setBrickslabel(String brickslabel) {
        this.brickslabel = brickslabel;
    }

    public String getCementLabel() {
        return cementLabel;
    }

    public void setCementLabel(String cementLabel) {
        this.cementLabel = cementLabel;
    }

    public String getSandLabel() {
        return sandLabel;
    }

    public void setSandLabel(String sandLabel) {
        this.sandLabel = sandLabel;
    }

    public float getWetToDryConstantForConcrete() {
        return wetToDryConstantForConcrete;
    }

    public void setWetToDryConstantForConcrete(float wetToDryConstantForConcrete) {
        this.wetToDryConstantForConcrete = wetToDryConstantForConcrete;
    }

    public float getWetToDryConstantForMortar() {
        return wetToDryConstantForMortar;
    }

    public void setWetToDryConstantForMortar(float wetToDryConstantForMortar) {
        this.wetToDryConstantForMortar = wetToDryConstantForMortar;
    }

    public float getCementUnits() {
        return cementUnits;
    }

    public void setCementUnits(float cementUnits) {
        this.cementUnits = cementUnits;
    }

    public float getSandUnits() {
        return sandUnits;
    }

    public void setSandUnits(float sandUnits) {
        this.sandUnits = sandUnits;
    }

    public float getCiToCftConversionFactor() {
        return ciToCftConversionFactor;
    }

    public void setCiToCftConversionFactor(float ciToCftConversionFactor) {
        this.ciToCftConversionFactor = ciToCftConversionFactor;
    }

    public float getTest() {
        return test;
    }

    public void setTest(float test) {
        this.test = test;
    }

    public float getDensityOfCement() {
        return densityOfCement;
    }

    public void setDensityOfCement(float densityOfCement) {
        this.densityOfCement = densityOfCement;
    }

    public float getM3ToCftConversionFactor() {
        return m3ToCftConversionFactor;
    }

    public void setM3ToCftConversionFactor(float m3ToCftConversionFactor) {
        this.m3ToCftConversionFactor = m3ToCftConversionFactor;
    }
}
