using UnityEngine;
using System.Collections;

public class MenuUI : MonoBehaviour {

    public void startDFS()
    {
        Application.LoadLevel(1);
    }

    public void startBFS()
    {
        Application.LoadLevel(2);
    }

    public void startDijkstra()
    {
        Application.LoadLevel(3);
    }


}
