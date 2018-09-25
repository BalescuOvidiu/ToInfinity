using UnityEngine;
using System.Collections;

public class muchie_control : MonoBehaviour {

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
    public controller MS;   //main script
    public Vector2 mouse;
    public Vector2 aux;
    public int sh;

    void Start()
    {
        MS = GameObject.Find("menu").GetComponent<controller>();
        sh = Screen.height;
        MS.adiacenta[a][b] = true;

        setTextPos();

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
            MS.graf[a][b] = 0;
            Destroy(gameObject);
        }
    }

    void OnGUI()
    {
        GUI.skin = skin;
        if (MS.startDijkstra == false)
        {
            costTxt = GUI.TextField(TextBoxPos, costTxt);
            cost = fastParse(costTxt);
            if (cost < 0)
                cost = 0;
            if (cost > 9999)
                cost /= 10;
            costTxt = cost.ToString();
            MS.graf[a][b] = cost;
        }
        else
            GUI.TextField(TextBoxPos, costTxt);
    }

    int fastParse(string s) //parsare string in int
    {
        int x=0,i;
        for (i = 0; i < s.Length; i++)
            if (s[i] <= '9' && s[i] >= '0')
                x = x * 10 + s[i] - 48;
        return x;
    }

    public void setTextPos()   //calculeaza pozitie text field
    {
        dist = Screen.height / 13;
        dif = dist / 3;
        aux = B - A;
        unghi = Mathf.Atan2(aux.y, aux.x);
        alfa = unghi + (Mathf.PI / 2);
        M = (A + B) / 2;
        P.x = M.x + dist * Mathf.Cos(alfa) - dif;
        P.y = Screen.height - (M.y + dist * Mathf.Sin(alfa)) - dif;
        dim = new Vector2(Screen.width / 20, Screen.height / 20);
        TextBoxPos = new Rect(P, dim);
    }
    
}
