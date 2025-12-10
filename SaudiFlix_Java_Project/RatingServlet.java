import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
import java.sql.*;

public class RatingServlet extends HttpServlet {

 protected void doPost(HttpServletRequest req, HttpServletResponse res)
 throws ServletException, IOException {

  int uid = Integer.parseInt(req.getParameter("userId"));
  int mid = Integer.parseInt(req.getParameter("movieId"));
  double val = Double.parseDouble(req.getParameter("rating"));

  try (Connection c = DBConnection.getConnection()) {

    PreparedStatement ps = c.prepareStatement(
      "INSERT INTO Ratings (user_id, movie_id, rating_value, rating_date) VALUES (?, ?, ?, CURDATE())"
    );

    ps.setInt(1, uid);
    ps.setInt(2, mid);
    ps.setDouble(3, val);
    ps.executeUpdate();

    res.sendRedirect("movies.jsp");

  } catch (Exception e) {
    e.printStackTrace();
  }
 }
}
