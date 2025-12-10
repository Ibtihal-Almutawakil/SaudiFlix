import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
import java.sql.*;

public class WatchlistServlet extends HttpServlet {

 protected void doPost(HttpServletRequest req, HttpServletResponse res)
 throws ServletException, IOException {

  int uid = Integer.parseInt(req.getParameter("userId"));
  int mid = Integer.parseInt(req.getParameter("movieId"));

  try (Connection c = DBConnection.getConnection()) {

    PreparedStatement ps = c.prepareStatement(
      "INSERT INTO Watchlist (user_id, movie_id, added_date) VALUES (?, ?, CURDATE())"
    );

    ps.setInt(1, uid);
    ps.setInt(2, mid);
    ps.executeUpdate();

    res.sendRedirect("watchlist.jsp");

  } catch (Exception e) {
    e.printStackTrace();
  }
 }
}
