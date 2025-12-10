public class Review {
    public int reviewId, userId, movieId;
    public String text;

    public Review(int rid, int uid, int mid, String t) {
        reviewId = rid;
        userId = uid;
        movieId = mid;
        text = t;
    }
}
