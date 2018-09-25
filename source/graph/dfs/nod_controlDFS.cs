using UnityEngine;
using System.Collections;

public class nod_controlDFS : MonoBehaviour {

    public int numar;
    public GameObject menu;
    public controllerDFS MS;   //main script
    public bool drag;   //daca se face scroll de pe nod drag=true
    public bool adm;
    public int cost;    //costul de la nodul selectat la acest nod memorat ca intreg
    public string costS;    //costul de la nodul selectat la acest nod memorat ca sir de caractere
    public Rect labelPos;
    public GUISkin skin;
    public hilightcontrolDFS hc;
    public GameObject[] muchiiObjA = new GameObject[100];   //muchii care pleaca din nod
    public GameObject[] muchiiObjB = new GameObject[100];   //muchii care vin in nod
    public muchie_controlDFS[] muchiiA = new muchie_controlDFS[100];
    public muchie_controlDFS[] muchiiB = new muchie_controlDFS[100];
    public bool isDragging;
    public Vector3 poz;
    Vector2 mousePos;
    Vector3 objPos;
    int i;
    int sh;
    int sw;

    void Start()
    {
        //initializari
        sh = Screen.height;
        sw = Screen.width;
        menu = GameObject.Find("menu");
        MS = menu.GetComponent<controllerDFS>();
        GetComponent<SpriteRenderer>().color = MS.culoare_nod;
    }

    void OnMouseOver()
    {
        if (!isDragging)
        {
            MS.ok = false;
            MS.err = "suprapunere";
            adm = true;
            MS.deasupra = numar;
        }

    }

    void OnMouseExit()
    {
        if (MS.deasupra == numar && adm)
        {
            MS.ok = true;
            adm = false;
        }
    }

    void OnMouseDown()
    {
        if (MS.mutaNodActive && !MS.startDijkstra)
        {
            for (int i = 1; i <= MS.q; i++)
            {
                muchiiObjA[i] = GameObject.Find(numar.ToString() + "-" + i.ToString());
                muchiiObjB[i] = GameObject.Find(i.ToString() + "-" + numar.ToString());

                if (muchiiObjA[i] != null)
                    muchiiA[i] = muchiiObjA[i].GetComponent<muchie_controlDFS>();
                if (muchiiObjB[i] != null)
                    muchiiB[i] = muchiiObjB[i].GetComponent<muchie_controlDFS>();
            }
            isDragging = true;
        }
        if (MS.stergeNodActive && !MS.startDijkstra)
        {
            GameObject aux;
            for (int i = 1; i <= MS.q; i++)
            {
                MS.adiacenta[numar][i] = MS.adiacenta[i][numar] = false;
                aux = GameObject.Find(i.ToString() + '-' + numar.ToString());
                if (aux != null)
                    Destroy(aux);
                aux = GameObject.Find(numar.ToString() + '-' + i.ToString());
                if (aux != null)
                    Destroy(aux);
            }
            MS.ok = true;
            MS.ex[numar] = false;
            Destroy(gameObject);
        }
    }

    void OnMouseDrag()
    {
        if (!MS.mutaNodActive)
            drag = true;
        else if (MS.mutaNodActive && MS.isInRect() && MS.ok)
        {
            MS.pozitieNoduri[numar] = transform.position;
            moveToMousePos();

            for (i = 1; i <= MS.q; i++)
            {
                if (muchiiA[i] != null) //actualizam fiecare muchie care pleaca din nodul i
                {
                    muchiiA[i].A = Camera.main.WorldToScreenPoint(transform.position);
                    MS.pozitioneazaMuchie(transform.position, Camera.main.ScreenToWorldPoint(muchiiA[i].B), muchiiObjA[i]);
                }
                if (muchiiB[i] != null) //acutualizam fiecare muchie care vine in nodul i
                {
                    muchiiB[i].B = Camera.main.WorldToScreenPoint(transform.position);
                    MS.pozitioneazaMuchie(Camera.main.ScreenToWorldPoint(muchiiB[i].A), transform.position, muchiiObjB[i]);
                }
            }
        }
    }

    void OnMouseUp()
    {
        if (!isDragging)
        {
            mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            if (drag && MS.ok && !MS.overGUI && MS.isInRect() && !MS.mutaNodActive && !MS.stergeMuchieActive)
            {
                MS.ad();
                MS.adauga_muchie(transform.position, mousePos, numar, MS.ultimulAdaugat);
            }
            if (!MS.ok && MS.deasupra != numar && MS.adiacenta[numar][MS.deasupra] == false && !MS.mutaNodActive && !MS.stergeMuchieActive)
            {
                MS.adauga_muchie(transform.position, GameObject.Find("nod " + MS.deasupra.ToString()).transform.position, numar, MS.deasupra);
            }
            drag = false;
        }
        if (isDragging)
        {
            isDragging = false;
        }

    }

    void moveToMousePos()   //muta nodul la pozitia cursorului
    {
        mousePos = Input.mousePosition;
        objPos = Camera.main.ScreenToWorldPoint(mousePos);
        objPos += new Vector3(0, 0, 10);
        transform.position = objPos;
    }

    void Update()
    {

        //pentru remedierea suprapunerii
        poz = transform.position;
        if (isDragging)
            poz.z = 5;
        else
            poz.z = 0;
        transform.position = poz;

    }
}
