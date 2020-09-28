package com.building.materials.enumeration;

public enum EnumUnitsLabel {
    CUBIC_INCHES("CI"),
    CUBIC_FEET("CFT");

    private final String value;

    EnumUnitsLabel(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
