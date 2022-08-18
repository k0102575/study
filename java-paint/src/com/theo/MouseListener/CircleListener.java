package com.theo.MouseListener;

import com.theo.Panel;
import com.theo.Shapes.Circle;
import com.theo.Shapes.Square;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class CircleListener extends MouseAdapter {

    Panel panel;

    public CircleListener(Panel panel) {
        this.panel = panel;
    }

    public void mousePressed(MouseEvent e) {
        panel.setStartPoint(e.getPoint());
        panel.getGraphics();
    }

    public void mouseReleased(MouseEvent e) {
        panel.setEndPoint(e.getPoint());
        panel.repaint();

        panel.getOriginStack().add(new Circle(panel.getShapeX(), panel.getShapeY(), panel.getShapeWidth(), panel.getShapeHeight()));
        panel.finishShape();
    }

    public void mouseDragged(MouseEvent e) {
        panel.setEndPoint(e.getPoint());
        panel.repaint();
    }

}
