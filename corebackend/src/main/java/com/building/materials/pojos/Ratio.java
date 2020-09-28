package com.building.materials.pojos;

public class Ratio {
    private float numerator = 0;
    private float denominator = 0;

    public Ratio() {
    }

    public Ratio(float numerator, float denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    public float getNumerator() {
        return numerator;
    }

    public void setNumerator(float numerator) {
        this.numerator = numerator;
    }

    public float getDenominator() {
        return denominator;
    }

    public void setDenominator(float denominator) {
        this.denominator = denominator;
    }


    @Override
    public String toString() {
        return numerator+":"+denominator;
    }
}
