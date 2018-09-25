using UnityEngine;
using System.Collections;

public class nod_controlBFS : MonoBehaviour {

    public static int maxN = 50;    //numarul maxim de noduri
    public int numar;
    public GameObject menu;
    public controllerBFS MS;   //main script
    public bool drag;   //daca se face scroll de pe nod drag=true
    public bool adm;
    public int cost;    //costul de la nodul selectat la acest nod memorat ca intreg
    public string costS;    //costul de la nodul selectat la acest nod memorat ca sir de caractere
    public Rect labelPos;
    public hilightcontrolBFS hc;
    public GameObject[] muchiiObjA;   //muchii care pleaca din nod
    public GameObject[] muchiiObjB;   //muchii care vin in nod
    public muchie_controlBFS[] muchiiA;
    public muchie_controlBFS[] muchiiB;
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
        MS = menu.GetComponent<controllerBFS>();
        GetComponent<SpriteRenderer>().color = MS.culoare_nod;

        //declaratii
        muchiiObjA = new GameObject[maxN];
        muchiiObjB = new GameObject[maxN];
        muchiiA = new muchie_controlBFS[maxN];
        muchiiB = new muchie_controlBFS[maxN];
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
                    muchiiA[i] = muchiiObjA[i].GetComponent<muchie_controlBFS>();
                if (muchiiObjB[i] != null)
                    muchiiB[i] = muchiiObjB[i].GetComponent<muchie_controlBFS>();
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
            if (drag && MS.ok && !MS.overGUI && MS.isInRect() && MS.q < 50 && !MS.mutaNodActive && !MS.stergeMuchieActive)
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
