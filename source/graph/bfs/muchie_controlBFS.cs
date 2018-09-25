using UnityEngine;
using System.Collections;

public class muchie_controlBFS : MonoBehaviour {

    public Vector2 A;   //pozitie nod pornire
    public Vector2 B;   //pozitie nod destinatie
    public int a;   //nod pornire
    public int b;   //nod destinatie
    public float unghi; //unghiul dintre noduri
    public Vector2 M;   //mijloc
    public Vector2 P;   //pozitie text field
    public float dist;
    public float alfa;
    public Vector2 dim; //dimensiune text field
    public Rect TextBoxPos;
    public int cost;
    public string costTxt;
    public float dif;
    public GUISkin skin;
    public controllerBFS MS;   //main script
    public Vector2 mouse;
    public Vector2 aux;
    public int sh;

    void Start()
    {
        MS = GameObject.Find("menu").GetComponent<controllerBFS>();
        sh = Screen.height;
        MS.adiacenta[a][b] = true;

        costTxt = "0";
    }

    void Update()
    {
        mouse = Input.mousePosition;
        mouse.y = sh - mouse.y;
        if (TextBoxPos.Contains(mouse))
        {
            MS.overGUI = true;
            if (MS.err != gameObject.transform.name)
                MS.err = gameObject.transform.name;
        }
        else if (MS.err == gameObject.transform.name)
            MS.overGUI = false;

    }

    void OnMouseDown()
    {
        if (!MS.startDijkstra && MS.stergeMuchieActive)
        {
            MS.ok = true;
            MS.adiacenta[a][b] = false;
            Destroy(gameObject);
        }
    }
}
