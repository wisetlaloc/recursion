class Solution{
    public static String getShapeType(int ax,int ay,int bx,int by,int cx,int cy,int dx,int dy){
        //ここから書きましょう
        Point a = new Point(ax, ay);
        Point b = new Point(bx, by);
        Point c = new Point(cx, cy);
        Point d = new Point(dx, dy);
        Line ab = new Line(a, b);
        Line bc = new Line(b, c);
        Line cd = new Line(c, d);
        Line da = new Line(d, a);
        Line ac = new Line(a, c);
        Line bd = new Line(b, d);

        if (anyPointSame(a, b, c, d) || anyLineOnSame(ab, bc, cd, da)) return "not a quadrilateral";

        if (ab.isParallelReverse(cd) && bc.isParallelReverse(da)){
            if (ab.isSameLength(bc)){
                return ac.isSameLength(bd) ? "square(正方形)" : "rhombus(ひし形)";
            } else {
                return ac.isSameLength(bd) ? "rectangle(長方形)" : "parallelogram(平行四辺形)";
            }
        }

        if (ab.isParallelReverse(cd) || bc.isParallelReverse(da)) return "trapezoid(台形)";

        if ((ab.isSameLength(bc) && cd.isSameLength(da)) || (ab.isSameLength(da) && bc.isSameLength(cd))) return "kite(凧)";

        return "other（その他）";
    }

    public static boolean anyPointSame(Point a, Point b, Point c, Point d){
        return a.isSame(b) || a.isSame(c) || a.isSame(d) || b.isSame(c) || b.isSame(d) || c.isSame(d);
    }

    public static boolean anyLineOnSame(Line ab, Line bc, Line cd, Line da){
        return ab.isOnSame(bc) || ab.isOnSame(cd) || ab.isOnSame(da) || bc.isOnSame(cd) || bc.isOnSame(da) || cd.isOnSame(da);
    }
}

class Point{
    public int x;
    public int y;

    public Point(int x, int y){
        this.x = x;
        this.y = y;
    }

    public boolean isSame(Point point) {
        return this.x == point.x && this.y == point.y;
    }
}

class Line{
    public Point start;
    public Point end;

    public Line(Point start, Point end){
        this.start = start;
        this.end = end;
    }

    public boolean isOnSame(Line line) {
        return this.isParallel(line) && this.constant() == line.constant();
    }

    public boolean isSameLength(Line line){
        return this.vector().length() == line.vector().length();
    }

    public boolean isParallel(Line line){
        return this.vector().isParallel(line.vector()); 
    }

    public boolean isParallelReverse(Line line) {
        return this.vector().isParallelReverse(line.vector());
    }

    // 直線をax+by+c=0で表すときのc
    private double constant(){
        return (-1) * this.vector().y * this.start.x + this.vector().x * this.start.y;
    }

    private Vector vector() {
        return new Vector(this.end.x - this.start.x, this.end.y - this.start.y);
    }
}

class Vector{
    public double x;
    public double y;

    public Vector(double x, double y){
        this.x = x;
        this.y = y;
    }

    public double length(){
        return Math.pow(Math.pow(this.y, 2) + Math.pow(this.x, 2), 0.5);
    }

    public boolean isParallel(Vector vector) {
        return this.x * vector.y == this.y * vector.x;
    }

    public boolean isParallelReverse(Vector vector) {
        if (!this.isParallel(vector)) return false;
        if (this.x != 0) return this.x * vector.x < 0;
        if (this.y != 0) return this.y * vector.y < 0;
        return false;
    }
}

