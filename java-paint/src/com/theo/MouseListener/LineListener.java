package com.theo.MouseListener;

import com.theo.Panel;
import com.theo.Shapes.Line;
import com.theo.Shapes.Straight;

import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

public class LineListener extends MouseAdapter {

    Panel panel;

    public LineListener(Panel panel) {
        this.panel = panel;
    }

    public void mousePressed(MouseEvent e) {
        panel.setStraightList(new ArrayList<>());
        panel.setStartPoint(e.getPoint());
    }

    public void mouseDragged(MouseEvent e) {

        Point point = e.getPoint();
        panel.setEndPoint(point);

        int x1 = panel.getStartPoint().x;
        int y1 = panel.getStartPoint().y;
        int x2 = panel.getEndPoint().x;
        int y2 = panel.getEndPoint().y;

        panel.getGraphics().drawLine(x1, y1, x2, y2);
        panel.getStraightList().add(new Straight(x1, y1, x2, y2));
        panel.setStartPoint(point);
    }

    public void mouseReleased(MouseEvent e) {
        Line line = new Line();
        line.setLineArray(panel.getStraightList());
        panel.getOriginStack().add(line);
        panel.finishShape();
    }

}
