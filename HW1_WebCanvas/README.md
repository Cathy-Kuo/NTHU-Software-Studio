# Software Studio 2018 Spring Assignment 01 Web Canvas

## Web Canvas
<img src="example01.gif" width="700px" height="500px"></img>

## Todo
1. **Fork the repo ,remove fork relationship and change project visibility to public.**
2. Create your own web page with HTML5 canvas element where we can draw somethings.
3. Beautify appearance (CSS).
4. Design user interaction widgets and control tools for custom setting or editing (JavaScript).
5. **Commit to "your" project repository and deploy to Gitlab page.**
6. **Describing the functions of your canvas in REABME.md**

## Scoring (Check detailed requirments via iLMS)

| **Item**                                         | **Score** |
| :----------------------------------------------: | :-------: |
| Basic components                                 | 60%       |
| Advance tools                                    | 35%       |
| Appearance (subjective)                          | 5%        |
| Other useful widgets (**describe on README.md**) | 1~10%     |

## Reminder
* Do not make any change to our root project repository.
* Deploy your web page to Gitlab page, and ensure it works correctly.
    * **Your main page should be named as ```index.html```**
    * **URL should be : https://[studentID].gitlab.io/AS_01_WebCanvas**
* You should also upload all source code to iLMS.
    * .html or .htm, .css, .js, etc.
    * source files
* **Deadline: 2018/04/05 23:59 (commit time)**
    * Delay will get 0 point (no reason)
    * Copy will get 0 point
    * "屍體" and 404 is not allowed

---

## Put your report below here
Report:
Function:
點畫筆時及圖形時，游標都會換成畫筆的圖形，象徵畫畫的意思，而點橡皮擦時，游標會改成橡皮擦的圖形。
畫筆及圖形均可以改變他們的顏色與粗細，用Colors與Width調整。
Text的地方可以打字，點畫布後按enter便可出現在滑鼠點擊的位置，在Text底下的Size跟Type可以選擇字體大小與字型。
在Image的地方可以上傳圖片到畫布上。
兩個箭頭分別代表Undo與Redo，箭頭旁邊雲的符號可將畫下載到電腦。
最下面的Reset可供清空畫布。

（原本以為report是要解釋coding的內容才打了下面這段QQ）
Coding:
在整個canvas一創建時便呼叫ini()，並畫一個與canvas大小相同的白色方形並push()，才不會造成後面redo undo 和畫圖形的問題。

畫圖：主要要畫出東西的function為draw()，供畫筆、橡皮擦、方形、圓形、三角形做使用，我在html的地方將這些這些工具做成button型態，當click時就呼叫draw()並且傳他們的值進去。而我在這裡學到的一個觀念是當我都用input來判斷時，由於只傳了一次input進來，所以當我在使用工具時他並不會持續傳input近來，而這樣會導致我裡面的判斷式出錯，所以我用設一個全域變數flag來判斷最新的input，這樣便能在聽到mouse事件時做出正確的判斷。
由於游標只需更動一次，便在input近來時判斷設游標的圖形也將顏色設為black，所以我的小畫家在最初點圖形時都是黑色。
最重要要畫出圖形地方便是mousedown與mousemove時，在mousedown時，由於畫筆和橡皮擦均是沿著路徑畫就行，所以只需要取得mouse值後moveto便可，在同時聽到mousemove時便呼叫mousemove，lineto當下的位置再stroke就完成了；而圖形的部分較為麻煩，我採用先記得滑鼠點下的位置後跟mousemove的位置去運算方形的寬與高，三角形的底與高和圓形的半徑，而在畫圖形時最初會發生畫出許多同心圓、方形、三角形的狀況，所以在每次畫時都要貼上之前的圖再stroke，就能解決，這裡還有一個小地方是setTimeout，原先會有疊圖比畫圖慢的狀況，用setTimeout讓stroke等5毫秒後再畫，便可完成圖形的部分。最後在mouseup時要push畫完的那張圖並且removeEventListener mousemove才不會讓他持續畫。

調色及筆刷大小：調色的部分是當點下那個顏色後直接傳顏色的字串進去chooseColor的function後直接將strokeStyle=input即可。
筆刷大小的部分是用type="range"的拉條來控制，當change時便傳值進去WidthSize的function後直接將lineWidth=input即可。

Reset：在點下reset時，我將判斷畫畫的flag設回0，存圖array的變數'step'設回-1，並呼叫ini()。

Redo、Undo：這裡的概念是在每次更動canvas時將canvas push到一個array裡面並用step記現在的位置，在undo時讓step-1、redo時讓step+1，並貼上pusharray[step]。最開始時會有Listener重複呼叫導致重複聽到後一次push好幾次的狀況，所以我在全域設一個dra=0，並在呼叫draw()時執行addEventListener mousedown 、mouseup和mouseout，並讓dra=1，這樣就算重複呼叫draw()也只會聽一次，避免掉重複聽的狀況。

Download、Upload：Download是在html直接設一個"download="myImage.jpg""，在click時便讓herf=canvas.toDataURL("image/jpg")；而upload是在html設一個type="file"的物件，在change時呼叫onload的function後push。

Text：在全域先設大小與字體的初始值，在選擇字型大小的拉條與選擇筆刷大小時相同，只是我將值存起來供後面印出字時使用；而字體的部分則使用select與option來選擇，也是將選擇到的字體存起來後供印字時使用，在要印出字時將'ctx.font=大小+"px "+字體'，然後在fillText時將字印在滑鼠點擊的位置，並push便完成了。

排版的部分我利用bootstrap幫助我排版，並用css調整位置與大小，由於我的小畫家有底圖，所以在css裡我有使用到z-index來控制圖層。


