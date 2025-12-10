public class Movie {
    public int movieId; 
    public String title, description, genre, posterUrl;
    public int releaseYear, duration; 
    public double averageRating;

    public Movie(int id, String t, String d, String g, int y, int dur, String p, double r) {
        movieId = id;
        title = t;
        description = d;
        genre = g;
        releaseYear = y;
        duration = dur;
        posterUrl = p;
        averageRating = r;
    }
}
