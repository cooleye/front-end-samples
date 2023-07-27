  // 封装对话框组件
        function Dialog(title,conent,ensure,cancel){
            // 通过DOM操作，创建节点
            var dialog = document.createElement("div")
            dialog.classList.add("dialog")
            dialog.innerHTML = `<div class="dialog-main">
                                    <h3 class="dialog-title">${title}</h3>
                                    <div class="dialog-content">${conent}</div>
                                    <div class="dialog-control">
                                        <button class="primary m-button" id="ensurebtn" >确定</button>
                                        <button class="m-button" id="cancelbtn">取消</button>
                                    </div>
                                </div>`

            document.body.appendChild(dialog)

            dialog.onclick = function(e){
                if(e.target.id === 'ensurebtn'){
                    ensure()
                    document.body.removeChild(dialog)
                }else if(e.target.id === 'cancelbtn'){
                    cancel()
                    document.body.removeChild(dialog)
                }

            }

        }
