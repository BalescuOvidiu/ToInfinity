<?php
include "connection.php";
if(isset($_POST["id"])){
	if(is_numeric($_POST["id"])){
		mysqli_query($GLOBALS["db"],"SET NAMES 'utf8'");
		$result=mysqli_query($GLOBALS["db"],"SELECT author,title,content,date FROM post WHERE id=".$_POST["id"]);
		if(mysqli_num_rows($result)>0){
			$row=mysqli_fetch_assoc($result);
			echo "<article>
				<h1 id='title'>".$row['title']."</h1>
				<h3 id='author'>de ".$row['author']." la ".$row['date']."</h3>
				".$row['content']."
			</article>";
		}		
	}
}
?>