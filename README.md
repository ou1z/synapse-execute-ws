# What does this do?
This extension lets you execute any lua script into roblox using Synapse X Websockets.
# Tutorial / How to use
Put this script in your autoexec folder located inside of the Synapse X directory.
```
repeat wait() until game:IsLoaded()
while wait(1) do
    pcall(function()
        local ws = syn.websocket.connect("ws://localhost:28561/")
        ws:Send("auth:" .. game.Players.LocalPlayer.Name)
        ws.OnMessage:Connect(function(msg)
            local func, err = loadstring(msg)
            if err then
                ws:Send("compile_err:" .. err)
                return
            end
            func()
        end)
        ws.OnClose:Wait()
    end)
end
```
Next open up your visual studio code.  Open a script up.  When you are ready to execute, click the little button at the bottom left called..  
"Execute Synapse Script"
# Need Help / Questions
Please contact me on discord.  
Tag: cj#1211  
ID: 342330635806965761  
