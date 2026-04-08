import{y as B,z as I,e as V,o as l,w as p,a as c,u as i,b as e,c as u,i as x,g as d,t as o,n as R,F as U,A as L,C as M}from"./app-C9z9CPS7.js";import{Y as O,h as k,G as Y,V as G,S as Q}from"./transition-DZ7TpYJI.js";const W={class:"fixed inset-0 overflow-y-auto"},H={class:"flex items-center justify-center min-h-full p-4 text-center"},J={class:"flex items-center justify-between mb-6"},K={key:0,class:"space-y-4"},X={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},Z={class:"bg-white p-4 rounded-xl shadow-sm border border-gray-200"},tt={class:"space-y-2 text-sm"},et={class:"text-gray-800 font-medium"},st={class:"text-gray-800 font-medium"},ot={class:"bg-white p-4 rounded-xl shadow-sm border border-gray-200"},at={class:"space-y-2 text-sm"},nt={class:"text-gray-800 font-medium"},rt={key:0},it={class:"text-gray-800 font-medium"},lt={class:"text-gray-800 font-medium"},dt={class:"text-gray-800 font-medium"},ut={class:"bg-white p-4 rounded-xl shadow-sm border border-gray-200"},mt={class:"overflow-x-auto"},pt={class:"w-full text-sm text-gray-700"},ct={class:"px-3 py-3"},xt={class:"font-medium text-gray-800"},gt={class:"text-gray-500 text-xs"},yt={class:"px-3 py-3 text-center text-gray-700"},bt={class:"px-3 py-3 text-center text-gray-700"},ft={class:"px-3 py-3 text-center font-semibold text-gray-800"},wt={class:"bg-blue-50 border-t-2 border-blue-600"},vt={class:"px-3 py-3 text-center font-bold text-green-600"},ht={key:0,class:"flex gap-3"},$t={class:"mt-6 flex justify-end gap-3"},Dt={key:1,class:"mt-4"},_t={class:"bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between"},Rt={class:"text-right"},kt={class:"text-sm text-gray-600"},St={__name:"ReturnDetailsModal",props:{open:Boolean,returnData:Object},emits:["close","update-status"],setup(s,{emit:C}){const m=M(),f=s,w=C;B(()=>f.open,a=>{a?document.body.style.overflow="hidden":document.body.style.overflow=""}),I(()=>{document.body.style.overflow=""});const g=()=>{w("close")},v=a=>{w("update-status",f.returnData,a),g()},T=a=>{const t=m.props.billSetting||{},n=["58mm","80mm","112mm","210mm"],h=(t.print_size||"80mm").toString(),$=n.includes(h)?h:"80mm",D=a.return_no||`RET-${a.id}`,S=a.return_date_formatted||a.return_date||"",z=a.customer_name||"Walk-in Customer",F=a.sale_no||"N/A",_=(a.products||[]).map(r=>({name:r.product_name,qty:r.quantity||0,price:parseFloat(r.price||0),total:parseFloat(r.total||0)})),P=parseFloat(a.returned_total||a.total_refund||_.reduce((r,A)=>r+A.total,0)),j=parseFloat(a.replacement_total||0),N=a.payment_due_label||"Settled",E=parseFloat(a.payment_due_amount||0).toFixed(2),y=m.props.currency||"",q=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Return Receipt - ${D}</title>
      <style>
        @page { size: ${$} auto; margin: 0; }
        @media print { body{ margin:0; padding:0 } }
        *{ margin:0; padding:0; box-sizing:border-box }
        body{ font-family: Arial, Helvetica, sans-serif; font-size:13px; width:${$}; padding:6mm 5mm; color:#000; line-height:1.4; font-weight:600 }
        .header{text-align:center; margin-bottom:8px; padding-bottom:8px; border-bottom:2px dashed #000}
        .header h1{font-size:16px; font-weight:900; margin-bottom:4px}
        .info{margin:8px 0; font-size:12px}
        .info-row{display:flex; justify-content:space-between; margin:2px 0}
        .items-table{width:100%; margin:8px 0; font-size:12px; border-collapse:collapse}
        .items-table th{text-align:left; border-bottom:2px solid #000; padding:3px 2px}
        .items-table td{padding:3px 2px; border-bottom:1px dotted #000}
        .item-name{width:38%; word-wrap:break-word}
        .item-qty{width:12%; text-align:center}
        .item-price{width:25%; text-align:right}
        .item-total{width:25%; text-align:right}
        .section-title{margin-top:4px; font-weight:900}
        .totals{margin-top:8px; font-size:12px}
        .total-row{display:flex; justify-content:space-between; margin:3px 0}
        .total-row.grand{font-size:15px; font-weight:900; border-top:2px solid #000; border-bottom:2px solid #000; padding:6px 0; margin:8px 0}
        .footer{text-align:center; margin-top:12px; padding-top:8px; border-top:2px dashed #000; font-size:12px}
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          ${t.logo_path?`<div style="margin-bottom:6px;"><img src="/storage/${t.logo_path}" alt="logo" style="max-height:40px; max-width:100%; object-fit:contain;"/></div>`:""}
          <h1>${t.company_name||"SALES RETURN"}</h1>
          ${t.address?`<p>${t.address}</p>`:""}
          ${t.mobile_1||t.mobile_2?`<p>Tel: ${[t.mobile_1,t.mobile_2].filter(Boolean).join(" / ")}</p>`:""}
          ${t.email?`<p>${t.email}</p>`:""}
          ${t.website_url?`<p>${t.website_url}</p>`:""}
        </div>

        <div class="info">
          <div class="info-row"><span><strong>Return No:</strong></span><span>${D}</span></div>
          <div class="info-row"><span><strong>Date:</strong></span><span>${S}</span></div>
          <div class="info-row"><span><strong>Customer:</strong></span><span>${z}</span></div>
          <div class="info-row"><span><strong>Invoice:</strong></span><span>${F}</span></div>
          <div class="info-row"><span><strong>Type:</strong></span><span>${a.return_type===2?"Cash Refund":"Product Return"}</span></div>
        </div>

        <div class="section-title">Returned Items</div>
        <table class="items-table">
          <thead>
            <tr>
              <th class="item-name">Item</th>
              <th class="item-qty">Qty</th>
              <th class="item-price">Price</th>
              <th class="item-total">Total</th>
            </tr>
          </thead>
          <tbody>
            ${_.map(r=>`
              <tr>
                <td class="item-name">${r.name}</td>
                <td class="item-qty">${r.qty}</td>
                <td class="item-price">${r.price.toFixed(2)}</td>
                <td class="item-total">${r.total.toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row"><span>Returned Total:</span><span>${y} ${P.toFixed(2)}</span></div>
          <div class="total-row"><span>Replacement Total:</span><span>${y} ${j.toFixed(2)}</span></div>
          <div class="total-row grand"><span>${N.toUpperCase()}:</span><span>${y} ${E}</span></div>
        </div>

        <div class="footer"><p><strong>${t.footer_description||"Thank you!"}</strong></p><p style="margin-top:6px; font-size:9px;">Powered by POS System</p></div>
      </div>

      <script type="text/javascript">
        let printExecuted = false;
        window.onload = function(){ setTimeout(function(){ if(!printExecuted){ printExecuted = true; window.print(); } }, 300); };
        window.onafterprint = function(){ setTimeout(function(){ window.close(); }, 200); };
        setTimeout(function(){ if(!window.closed){ window.close(); } }, 5000);
      <\/script>
    </body>
    </html>
  `,b=window.open("","_blank","width=320,height=640");if(!b){alert("Please allow pop-ups to print receipt");return}b.document.write(q),b.document.close()};return(a,t)=>(l(),V(i(Q),{appear:"",show:s.open,as:"template"},{default:p(()=>[c(i(O),{as:"div",onClose:g,class:"relative z-10"},{default:p(()=>[c(i(k),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:p(()=>[...t[3]||(t[3]=[e("div",{class:"fixed inset-0 bg-black/25"},null,-1)])]),_:1}),e("div",W,[e("div",H,[c(i(k),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:p(()=>[c(i(Y),{class:"w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-gray-50 shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"},{default:p(()=>[e("div",J,[c(i(G),{as:"h3",class:"text-2xl font-bold text-blue-600"},{default:p(()=>{var n;return[d(" Return Details #"+o((n=s.returnData)==null?void 0:n.id),1)]}),_:1}),t[5]||(t[5]=d()),e("button",{onClick:g,class:"p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-all duration-200"},[...t[4]||(t[4]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",class:"w-6 h-6"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),s.returnData?(l(),u("div",K,[e("div",X,[e("div",Z,[t[11]||(t[11]=e("h3",{class:"font-semibold text-blue-600 mb-3 flex items-center gap-2"},"📋 Return Information",-1)),e("div",tt,[e("div",null,[t[6]||(t[6]=e("span",{class:"text-gray-600"},"Return ID:",-1)),t[7]||(t[7]=d()),e("span",et,"#"+o(s.returnData.id),1)]),e("div",null,[t[8]||(t[8]=e("span",{class:"text-gray-600"},"Return Date:",-1)),t[9]||(t[9]=d()),e("span",st,o(s.returnData.return_date_formatted),1)]),e("div",null,[t[10]||(t[10]=e("span",{class:"text-gray-600"},"Status:",-1)),e("span",{class:R([{"text-yellow-600":s.returnData.status_color==="yellow","text-green-600":s.returnData.status_color==="green","text-red-600":s.returnData.status_color==="red","text-gray-600":s.returnData.status_color==="gray"},"font-semibold"])},o(s.returnData.status_text),3)])])]),e("div",ot,[t[20]||(t[20]=e("h3",{class:"font-semibold text-green-600 mb-3 flex items-center gap-2"},"👤 Customer & Sale Info",-1)),e("div",at,[e("div",null,[t[12]||(t[12]=e("span",{class:"text-gray-600"},"Customer:",-1)),t[13]||(t[13]=d()),e("span",nt,o(s.returnData.customer_name||"Walk-in Customer"),1)]),s.returnData.customer_phone?(l(),u("div",rt,[t[14]||(t[14]=e("span",{class:"text-gray-600"},"Phone:",-1)),t[15]||(t[15]=d()),e("span",it,o(s.returnData.customer_phone),1)])):x("",!0),e("div",null,[t[16]||(t[16]=e("span",{class:"text-gray-600"},"Sale No:",-1)),t[17]||(t[17]=d()),e("span",lt,o(s.returnData.sale_no||"N/A"),1)]),e("div",null,[t[18]||(t[18]=e("span",{class:"text-gray-600"},"Processed by:",-1)),t[19]||(t[19]=d()),e("span",dt,o(s.returnData.user_name),1)])])])]),e("div",ut,[t[23]||(t[23]=e("h3",{class:"font-semibold text-green-600 mb-4 flex items-center gap-2"},"📦 Returned Products",-1)),e("div",mt,[e("table",pt,[t[22]||(t[22]=e("thead",{class:"border-b-2 border-blue-600"},[e("tr",null,[e("th",{class:"px-3 py-3 text-left text-blue-700 font-semibold"},"Product"),e("th",{class:"px-3 py-3 text-center text-blue-700 font-semibold"},"Quantity"),e("th",{class:"px-3 py-3 text-center text-blue-700 font-semibold"},"Unit Price"),e("th",{class:"px-3 py-3 text-center text-blue-700 font-semibold"},"Total")])],-1)),e("tbody",null,[(l(!0),u(U,null,L(s.returnData.products,n=>(l(),u("tr",{key:n.id,class:"border-b border-gray-200 hover:bg-gray-50 transition"},[e("td",ct,[e("div",xt,o(n.product_name),1),e("div",gt,o(n.product_barcode),1)]),e("td",yt,o(n.quantity),1),e("td",bt,"("+o(i(m).props.currency||"")+") "+o(n.formatted_price),1),e("td",ft,"("+o(i(m).props.currency||"")+") "+o(n.formatted_total),1)]))),128))]),e("tfoot",wt,[e("tr",null,[t[21]||(t[21]=e("td",{colspan:"3",class:"px-3 py-3 text-right font-semibold text-gray-800"},"Total Refund:",-1)),e("td",vt,"("+o(i(m).props.currency||"")+") "+o(s.returnData.total_refund_formatted),1)])])])])]),s.returnData.status===0?(l(),u("div",ht,[e("button",{onClick:t[0]||(t[0]=n=>v(1)),class:"px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold text-sm"}," ✅ Approve Return "),e("button",{onClick:t[1]||(t[1]=n=>v(2)),class:"px-6 py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition font-semibold text-sm"}," ❌ Reject Return ")])):x("",!0)])):x("",!0),e("div",$t,[s.returnData?(l(),u("button",{key:0,onClick:t[2]||(t[2]=n=>T(s.returnData)),class:"px-8 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-semibold text-sm"}," 🖨️ Print Receipt ")):x("",!0)]),s.returnData&&(s.returnData.payment_due_label||s.returnData.payment_due_amount!==void 0)?(l(),u("div",Dt,[e("div",_t,[t[24]||(t[24]=e("div",{class:"text-gray-800 font-semibold"},"💰 Net Payment",-1)),e("div",Rt,[e("div",kt,o(s.returnData.payment_due_label||"Settled"),1),e("div",{class:R(["text-xl font-bold",(s.returnData.payment_due_label||"").includes("Refund")?"text-green-600":"text-yellow-600"])}," ("+o(i(m).props.currency||"")+") "+o(s.returnData.payment_due_formatted||Number(s.returnData.payment_due_amount||0).toFixed(2)),3)])])])):x("",!0)]),_:1})]),_:1})])])]),_:1})]),_:1},8,["show"]))}};export{St as default};
