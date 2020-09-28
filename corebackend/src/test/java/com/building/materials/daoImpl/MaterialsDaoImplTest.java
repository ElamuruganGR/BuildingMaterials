package com.building.materials.daoImpl;

import com.building.materials.pojos.Cube;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.*;

//import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class MaterialsDaoImplTest {

    @Mock
    private MaterialsDaoImpl classUnderTest;

    @Test
    public void calculateVolumeOfCubeTest() {

//        MaterialsDaoImpl classUnderTest = new MaterialsDaoImpl();
        Cube component = new Cube(1,2,3);
        System.out.println("Component:"+component.toString());
        double volume = classUnderTest.calculateVolumeOfCube(component);
        Assertions.assertEquals(6.0, volume);
    }
/*
    @Test
    public void calculateVolumeOfCubeFromXtoCFTTest(){
        MaterialsDaoImpl classUnderTest = mock(MaterialsDaoImpl.class);
        float volume = classUnderTest.calculateVolumeOfCubeFromXtoCFT(new Cube(1,2,3), null);
        System.out.println("Volume 1 :"+volume);
//        assertThat(volume, is(equalTo(6.0)));
//        Assertions.assertEquals( 6.0, volume);
    }*/
  /*  @Test
    public  void calculateVolumeOfListOfCubesFromXtoCFTTest() {
        MaterialsDaoImpl classUnderTest = mock(MaterialsDaoImpl.class);
        List<Cube> componentsList = new ArrayList(){{add(new Cube(1,2,3));}};
        double volume = classUnderTest.calculateVolumeOfListOfCubesFromXtoCFT(componentsList, null);
        assertThat(volume, is(equalTo(6.0)));

    }*/
}
