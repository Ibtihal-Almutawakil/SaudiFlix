import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 
import java.sql.*;

public class LoginServlet extends HttpServlet {

 protected void doPost(HttpServletRequest req, HttpServletResponse res) 
 throws ServletException, IOException {

  String u = req.getParameter("username");
  String p = req.getParameter("password");

  try (Connection c = DBConnection.getConnection()) {

    PreparedStatement ps = c.prepareStatement(
      "SELECT * FROM Users WHERE username=? AND password=?"
    );
    ps.setString(1, u);
    ps.setString(2, p);

    ResultSet rs = ps.executeQuery();

    if (rs.next()) {
      HttpSession s = req.getSession();
      s.setAttribute("userId", rs.getInt("user_id"));
      s.setAttribute("username", rs.getString("username"));
      res.sendRedirect("movies.jsp");
    } else {
      res.sendRedirect("login.jsp?error=1");
    }

  } catch (Exception e) {
    e.printStackTrace();
  }
 }
}
