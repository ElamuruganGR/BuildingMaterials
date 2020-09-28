package com.building.materials.helpers;

import com.building.materials.constants.Constants;
import com.building.materials.pojos.QuantityAndCost;
import com.building.materials.pojos.Ratio;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaterialsDaoImplHelper extends Constants {

    /**
     *
     * @param innerWallsQuantityAndCost - list of inner walls (Mostly 4 walls and sometimes it can be >4)
     * @param outerWallsQuantityAndCost - list of outer walls (Mostly 4 walls and sometimes it can be >4)
     * @param ceilingQuantityAndCost - only one ceiling
     * @param material - Possible values (Cement, Sand)
     * @return componentQuantityAndCostForPlastering
     * @operation It adds all the quantities together and all costs together of (inner walls, outer walls and ceiling)
     *            and reduces it to a single quantity and cost
     */
    public QuantityAndCost getComponentQuantityAndCostForPlastering(List<QuantityAndCost> innerWallsQuantityAndCost,
                                                                    List<QuantityAndCost> outerWallsQuantityAndCost,
                                                                    List<QuantityAndCost> ceilingQuantityAndCost,
                                                                    String material){
        System.out.println("MaterialsDaoImplHelper.getComponentQuantityAndCostForPlastering()");
        QuantityAndCost componentQuantityAndCostForPlastering = null;
        System.out.println("=====Material======="+material);
        String quantityUnit = null;
        if(material.equals("Cement")){
            quantityUnit = cementQuantityUnit;
        } else if(material.equals("Sand")){
            quantityUnit = sandQuantityUnit;
        }
        float materialQuantityForPlastering =
                getQorC(innerWallsQuantityAndCost, "InnerWall"+material, "Q") +
                getQorC(outerWallsQuantityAndCost, "OuterWall"+material, "Q")+
                getQorC(ceilingQuantityAndCost,"Ceiling"+material, "Q");
        System.out.println("materialQuantityForPlastering: "+materialQuantityForPlastering);
        float costOfMaterialForPlastering =
                getQorC(innerWallsQuantityAndCost, "InnerWall"+material, "C") +
                getQorC(outerWallsQuantityAndCost, "OuterWall"+material, "C")+
                getQorC(ceilingQuantityAndCost,"Ceiling"+material, "C");
        System.out.println("costOfMaterialForPlastering: "+costOfMaterialForPlastering);
        componentQuantityAndCostForPlastering = new QuantityAndCost(
                material, materialQuantityForPlastering, quantityUnit, costOfMaterialForPlastering);
        System.out.println("Q :"+materialQuantityForPlastering+", C:"+costOfMaterialForPlastering);

        return componentQuantityAndCostForPlastering;
    }

    /**
     *
     * @param ratio - Cement : Sand
     * @param key - Possible values(numerator - to take cement ratio, denominator - to take sand ratio)
     * @return numerator/totalParts
     * @operation  It divides numerator or denominator by (numerator + denominator)
     */
    public float ratioWithTotalParts(Ratio ratio, String key){
        System.out.println("Ratio :"+ratio.toString());
        float totalParts = ratio.getNumerator() + ratio.getDenominator();
        return (key.equals("numerator") ? ratio.getNumerator() : ratio.getDenominator())/totalParts;
    }


    /**
     *
     * @param quantityAndCostList - list ofquantity and cost
     * @param idToMatch - possible values are
     *                  (InnerWallCement, OuterWallCement, CeilingCement,
     *                  InnerWallSand, OuterWallSand, CeilingSand)
     * @param key - possible values (Q - represents quantity, C - represents cost)
     * @return float
     * @operation It fetches the quantity or cost of cement or sand idToMatch and
     *            reduces it to a single quantity or cost based on the key
     */
    public float getQorC(List<QuantityAndCost> quantityAndCostList, String idToMatch, String key){
        System.out.println("MaterialsDaoImplHelper.getQorC()");
        System.out.println("LIST size: "+quantityAndCostList.size());
        System.out.println("idToMatch: "+idToMatch);
        for(QuantityAndCost qac : quantityAndCostList){
            System.out.println("Looping:"+qac.getId());
        }
        QuantityAndCost quantityAndCost =
                quantityAndCostList.stream().filter(qac -> qac.getId().equals(idToMatch)).findFirst().get();
        System.out.println("Key:"+key);
        if(key.equals("Q")){
            return quantityAndCost.getQuantityRequired();
        } else if(key.equals("C")){
            return quantityAndCost.getCost();
        } else {
            return 0;
        }
    }

}
