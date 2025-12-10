import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
import java.sql.*; 
import java.util.*;

public class MoviesServlet extends HttpServlet {

 protected void doGet(HttpServletRequest req, HttpServletResponse res)
 throws ServletException, IOException {

  List<Movie> list = new ArrayList<>();

  try (Connection c = DBConnection.getConnection()) {

    PreparedStatement ps = c.prepareStatement("SELECT * FROM Movies");
    ResultSet rs = ps.executeQuery();

    while (rs.next()) {
      list.add(new Movie(
        rs.getInt("movie_id"),
        rs.getString("title"),
        rs.getString("description"),
        rs.getString("genre"),
        rs.getInt("release_year"),
        rs.getInt("duration"),
        rs.getString("poster_url"),
        rs.getDouble("average_rating")
      ));
    }

    req.setAttribute("movies", list);
    req.getRequestDispatcher("movies.jsp").forward(req, res);

  } catch (Exception e) {
    e.printStackTrace();
  }
 }
}
