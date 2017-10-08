    <%@ page language="java" import="java.util.*, java.io.*" pageEncoding="UTF-8"%>

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
        <html>
        <head>

        <title>EditTicket.jsp</title>

        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
        <meta http-equiv="description" content="This is my page">
        <!--
        <link rel="stylesheet" type="text/css" href="styles.css">
        -->

        </head>

        <body>
            <%

    	String name = new String(request.getParameter("name").trim().getBytes("ISO-8859-1"), "UTF-8");
        String old = request.getParameter("old");
        String year = request.getParameter("year");
        String sex = new String(request.getParameter("sex").trim().getBytes("ISO-8859-1"), "UTF-8");
        String states = new String(request.getParameter("states").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String addr = new String(request.getParameter("addr").trim().getBytes("ISO-8859-1"), "UTF-8");

    	System.out.println("name = " + name);
    	System.out.println("old = " + old);
    	System.out.println("year = " + year);
    	System.out.println("sex = " + sex);
    	System.out.println("states = " + states);
    	System.out.println("addr = " + addr);



    	String json = "{'name':'" + name + "','old':'" + old + "','year':'" + year
    				+ "','sex':'" + sex +"','states':'" + states + "','addr':'" + addr + "'}";

    	PrintWriter pw = response.getWriter();
    	pw.write(json);
    	pw.flush();
    	pw.close();

     %>
        </body>
        </html>