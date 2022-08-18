package com.theo.MouseListener;

import com.theo.Panel;
import com.theo.Shapes.Line;
import com.theo.Shapes.Polygon;
import com.theo.Shapes.Straight;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.lang.reflect.Array;
import java.util.ArrayList;

public class PolygonListener extends MouseAdapter {

    Panel panel;

    public PolygonListener(Panel panel) {
        this.panel = panel;
    }

    public void mousePressed(MouseEvent e) {

        ArrayList<Straight> panelStrightList = panel.getStraightList();
        Point point = e.getPoint();

        if(SwingUtilities.isLeftMouseButton(e)) {
            if(panelStrightList == null) {
                panel.setStraightList(new ArrayList<>());
                panel.setStartPoint(point);
                panel.getGraphics();
            } else {
                panel.setEndPoint(point);
                panel.repaint();
                panelStrightList.add(new Straight(panel.getStartPoint().x, panel.getStartPoint().y, panel.getEndPoint().x, panel.getEndPoint().y));
                panel.setStartPoint(point);
            }
        }

        if(SwingUtilities.isRightMouseButton(e) && panelStrightList != null && panelStrightList.size() > 1) {

            int last = panel.getStraightList().size() - 1;
            int x1 = panelStrightList.get(0).getX1();
            int y1 = panelStrightList.get(0).getY1();
            int x2 = panelStrightList.get(last).getX2();
            int y2 = panelStrightList.get(last).getY2();

            panelStrightList.add(new Straight(x1, y1, x2, y2));
            panel.repaint();

            panel.getOriginStack().add(new Polygon(panelStrightList));
            panel.finishShape();

        }

    }

    public void mouseMoved(MouseEvent e){
        panel.setEndPoint(e.getPoint());
        panel.repaint();
    }

}
