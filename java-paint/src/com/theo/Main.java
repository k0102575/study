package com.theo;

import java.awt.*;

public class Main {

    public static void main(String[] args) {
        Frame frame = new Frame();
        Panel panel = new Panel();

        frame.getContentPane().add(new ButtonBox(frame, panel));
        frame.getContentPane().add(panel);

        frame.pack();
        frame.setVisible(true);

    }

}
