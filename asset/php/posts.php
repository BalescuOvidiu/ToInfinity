<?php
//Get title of posts
include "connection.php";
mysqli_query($GLOBALS["db"],"SET NAMES 'utf8'");
$result=mysqli_query($GLOBALS["db"],"SELECT id,author,title,date,tags FROM post");
//Show
if(mysqli_num_rows($result)>0){
	//Get data
	while($row=mysqli_fetch_assoc($result)){
		echo "<section onclick='print_post(".$row['id'].");' class='post' id='post".$row['id']."'>
			<h1 id='title'>".$row['title']."</h1>
			<img src='img/other/".$row['id'].".png'/>
			<h3 id='author'>de ".$row['author']." la ".$row['date']."</h3>
			<p id='content'>".$row['tags']."</p>
		</section>";

	}
}
?>