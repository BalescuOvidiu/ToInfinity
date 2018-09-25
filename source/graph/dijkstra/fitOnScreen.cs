using UnityEngine;
using System.Collections;

public class fitOnScreen : MonoBehaviour {

    public Vector3 colt;
    
	void Start ()
    {
        float sw = Screen.width;
        float sh = Screen.height;

        colt = new Vector2(sw / 30, 11* sh / 12);
        colt = Camera.main.ScreenToWorldPoint(colt);
        colt += new Vector3(0, 0, 10);
        transform.position = colt;
        
	}
	
}
