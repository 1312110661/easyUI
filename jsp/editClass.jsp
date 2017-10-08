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
        String classes = request.getParameter("classes");
        String headteacher = new String(request.getParameter("headteacher").trim().getBytes("ISO-8859-1"), "UTF-8");
        String teacher = new String(request.getParameter("teacher").trim().getBytes("ISO-8859-1"), "UTF-8");
    	String number = request.getParameter("number");

    	System.out.println("name = " + name);
    	System.out.println("classes = " + classes);
    	System.out.println("headteacher = " + headteacher);
    	System.out.println("teacher = " + teacher);
    	System.out.println("number = " + number);


    	String json = "{'name':'" + name + "','classes':'" + classes + "','headteacher':'" + headteacher
    				+ "','teacher':'" + teacher +"','number':'" + number + "'}";

    	PrintWriter pw = response.getWriter();
    	pw.write(json);
    	pw.flush();
    	pw.close();

     %>
        </body>
        </html>