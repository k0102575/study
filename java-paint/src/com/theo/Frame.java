package com.theo;

import javax.swing.*;
import java.awt.*;

public class Frame extends JFrame {

    public Frame() throws HeadlessException {
        super();
        this.getContentPane().setBackground(Color.white);

        this.setTitle("LINE");

        this.setLayout(new FlowLayout(FlowLayout.CENTER, 0, 0));

        Dimension dim = new Dimension(1024, 768);
        this.setPreferredSize(dim);

        this.pack();

        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

        this.setLocationRelativeTo(null);

    }

}
