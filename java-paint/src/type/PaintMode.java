package type;

public enum PaintMode {

    LINE("line"),
    SQUARE("square"),
    CIRCLE("circle"),
    POLYGON("polygon"),
    UNDO("undo"),
    REDO("redo");

    private String value;

    PaintMode(String code){

        this.value = code;
    }

    public String getValue(){

        return  this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
