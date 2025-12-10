public class Rating {
    public int ratingId, userId, movieId;
    public double ratingValue;

    public Rating(int rid, int uid, int mid, double val) {
        ratingId = rid;
        userId = uid;
        movieId = mid;
        ratingValue = val;
    }
}
