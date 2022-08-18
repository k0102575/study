package com.theo;

import com.theo.MouseListener.CircleListener;
import com.theo.MouseListener.PolygonListener;
import com.theo.MouseListener.LineListener;
import com.theo.MouseListener.SquareListener;
import com.theo.Shapes.Shape;
import type.PaintMode;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.Stack;

public class ButtonBox extends JPanel {

    JButton b1,b2,b3,b4,b5,b6;
    Frame frame;
    Panel panel;

    public ButtonBox(Frame frame, Panel panel) {

        this.frame = frame;
        this.panel = panel;

        GridLayout gLayout = new GridLayout(6,1);

        // Todo gap
        gLayout.setVgap(0);
        gLayout.setHgap(0);

        this.setLayout(gLayout);
        this.setPreferredSize(new Dimension(124, 768));

        b1 = addButton(this,"/resources/brush.png", PaintMode.LINE);
        b2 = addButton(this,"/resources/square.png", PaintMode.SQUARE);
        b3 = addButton(this,"/resources/oval.png", PaintMode.CIRCLE);
        b4 = addButton(this,"/resources/hexagon.png", PaintMode.POLYGON);
        b5 = addButton(this,"/resources/undo.png", PaintMode.UNDO);
        b6 = addButton(this,"/resources/redo.png", PaintMode.REDO);

    }

    public JButton addButton(JPanel panel,String url, PaintMode label) {
        JButton btn = new JButton();

        try {
            Image img = ImageIO.read(getClass().getResource(url));
            btn.setIcon(new ImageIcon(img));
        } catch (Exception ex) {
            btn.setText(label.toString());
        }

        panel.add(btn);

        btn.setName(label.toString());

        btn.addActionListener(new ButtonAction());

        btn.setFocusPainted(false);

        return btn;
    }

    class ButtonAction implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            JButton jb = (JButton) e.getSource();

            jb.setFocusPainted(false);

            if(jb.getName().equals("UNDO")) {
                Stack<Shape> originStack = panel.getOriginStack();
                if(!originStack.empty()) {
                    panel.getUndoStack().add(originStack.pop());
                    panel.repaint();
                }
            } else if(jb.getName().equals("REDO")) {
                Stack<Shape> undoStack = panel.getUndoStack();

                if(!undoStack.empty()) {
                    Shape s = undoStack.pop();
                    panel.getRedoStack().add(s);
                    panel.getOriginStack().add(s);
                    panel.repaint();
                }
            } else {

                frame.setTitle(jb.getName());
                for (MouseListener ml : panel.getMouseListeners()) {
                    panel.removeMouseListener(ml);
                }

                for (MouseMotionListener mml : panel.getMouseMotionListeners()) {
                    panel.removeMouseMotionListener(mml);
                }

                switch (jb.getName()) {

                    case "LINE":
                        panel.addMouseListener(new LineListener(panel));
                        panel.addMouseMotionListener(new LineListener(panel));
                        panel.setPaintMode(PaintMode.LINE);
                        break;

                    case "SQUARE":
                        panel.addMouseListener(new SquareListener(panel));
                        panel.addMouseMotionListener(new SquareListener(panel));
                        panel.setPaintMode(PaintMode.SQUARE);
                        break;

                    case "CIRCLE":
                        panel.addMouseListener(new CircleListener(panel));
                        panel.addMouseMotionListener(new CircleListener(panel));
                        panel.setPaintMode(PaintMode.CIRCLE);
                        break;

                    case "POLYGON":
                        panel.addMouseListener(new PolygonListener(panel));
                        panel.addMouseMotionListener(new PolygonListener(panel));
                        panel.setPaintMode(PaintMode.POLYGON);
                        break;

                }
            }

        }
    }

}
