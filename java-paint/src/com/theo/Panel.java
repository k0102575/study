package com.theo;

import com.theo.MouseListener.LineListener;
import com.theo.Shapes.*;
import com.theo.Shapes.Polygon;
import com.theo.Shapes.Shape;
import type.PaintMode;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Stack;

public class Panel extends JPanel {

    Point startPoint;
    Point endPoint;
    int shapeX;
    int shapeY;
    int shapeWidth;
    int shapeHeight;
    ArrayList<Straight> straightList;
    Stack<Shape> originStack = new Stack<>();
    Stack<Shape> undoStack = new Stack<>();
    Stack<Shape> redoStack = new Stack<>();
    PaintMode paintMode = PaintMode.LINE;

    public Panel(){
        this.addMouseListener(new LineListener(this));
        this.addMouseMotionListener(new LineListener(this));
        this.setPreferredSize(new Dimension(900, 768));
        this.setBackground(Color.WHITE);
    }

    @Override
    public void paintComponent(Graphics graphic) {

        super.paintComponent(graphic);

        for (Shape s : originStack) {
            if(s instanceof Circle) {
                graphic.drawOval(s.getX(), s.getY(), s.getWidth(), s.getHeight());
            } else if (s instanceof Line) {
                for (Straight straight : s.getLineArray()) {
                    graphic.drawLine(straight.getX1(), straight.getY1(), straight.getX2(), straight.getY2());
                }

            } else if (s instanceof Polygon) {
                for (Straight straight : s.getLineArray()) {
                    graphic.drawLine(straight.getX1(), straight.getY1(), straight.getX2(), straight.getY2());
                }

            } else if (s instanceof Square) {
                graphic.drawRect(s.getX(), s.getY(), s.getWidth(), s.getHeight());
            }
        }

        if(paintMode.equals(PaintMode.CIRCLE)) {
            if(startPoint != null && endPoint != null && graphic != null) {
                shapeX = Math.min(startPoint.x, endPoint.x);
                shapeY = Math.min(startPoint.y, endPoint.y);
                shapeWidth = Math.max(startPoint.x, endPoint.x) - Math.min(startPoint.x, endPoint.x);
                shapeHeight = Math.max(startPoint.y, endPoint.y) - Math.min(startPoint.y, endPoint.y);

                graphic.drawOval(shapeX, shapeY, shapeWidth, shapeHeight);
            }
        } else if(paintMode.equals(PaintMode.POLYGON)) {

            if(straightList != null) {
                for (Straight s : straightList) {
                    graphic.drawLine(s.getX1(), s.getY1(), s.getX2(), s.getY2());
                }
            }

            if(startPoint != null && endPoint != null && graphic != null) {
                graphic.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            }
        } else if(paintMode.equals(PaintMode.SQUARE)) {
            if(startPoint != null && endPoint != null && graphic != null) {
                shapeX = Math.min(startPoint.x, endPoint.x);
                shapeY = Math.min(startPoint.y, endPoint.y);
                shapeWidth = Math.max(startPoint.x, endPoint.x) - Math.min(startPoint.x, endPoint.x);
                shapeHeight = Math.max(startPoint.y, endPoint.y) - Math.min(startPoint.y, endPoint.y);

                graphic.drawRect(shapeX, shapeY, shapeWidth, shapeHeight);
            }
        }

    }

    public void finishShape() {
        startPoint = null;
        endPoint = null;
        shapeX = 0;
        shapeY = 0;
        shapeWidth = 0;
        shapeHeight = 0;
        straightList = null;
    }

    public Point getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Point startPoint) {
        this.startPoint = startPoint;
    }

    public Point getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(Point endPoint) {
        this.endPoint = endPoint;
    }

    public int getShapeX() {
        return shapeX;
    }

    public void setShapeX(int shapeX) {
        this.shapeX = shapeX;
    }

    public int getShapeY() {
        return shapeY;
    }

    public void setShapeY(int shapeY) {
        this.shapeY = shapeY;
    }

    public int getShapeWidth() {
        return shapeWidth;
    }

    public void setShapeWidth(int shapeWidth) {
        this.shapeWidth = shapeWidth;
    }

    public int getShapeHeight() {
        return shapeHeight;
    }

    public void setShapeHeight(int shapeHeight) {
        this.shapeHeight = shapeHeight;
    }

    public ArrayList<Straight> getStraightList() {
        return straightList;
    }

    public void setStraightList(ArrayList<Straight> straightList) {
        this.straightList = straightList;
    }

    public Stack<Shape> getOriginStack() {
        return originStack;
    }

    public void setOriginStack(Stack<Shape> originStack) {
        this.originStack = originStack;
    }

    public Stack<Shape> getUndoStack() {
        return undoStack;
    }

    public void setUndoStack(Stack<Shape> undoStack) {
        this.undoStack = undoStack;
    }

    public Stack<Shape> getRedoStack() {
        return redoStack;
    }

    public void setRedoStack(Stack<Shape> redoStack) {
        this.redoStack = redoStack;
    }

    public PaintMode getPaintMode() {
        return paintMode;
    }

    public void setPaintMode(PaintMode paintMode) {
        this.paintMode = paintMode;
    }
}
