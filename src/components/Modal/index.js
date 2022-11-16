import React, { useState } from 'react';
import ReactModal from 'react-modal';

import Collapse from '@kunukn/react-collapse';

import './style.css';

const imgSrcs = [
  'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiM2RTY2RkEiLz4KPHBhdGggZD0iTTI3Ljk0NzUgNTIuMTU5Nkw1MS45ODI2IDI4LjA1NzJMNzIuNjA5OCA3LjY1Mzg5QzczLjg3MzQgNi40MDQwMSA3Ni4wMTc4IDcuMjk5MSA3Ni4wMTc4IDkuMDc2NDJMNzYuMDE4NyA1Mi4xNTlMNTEuOTgzNiA3Ni4xMjY4TDI3Ljk0NzUgNTIuMTU5NloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8zNzk1XzI1NTQzKSIvPgo8cGF0aCBkPSJNMTAwLjA1MyA3NS45OTNMNzYuMDE4IDUxLjk1OEw1MS45ODI5IDc1Ljk5MzFMNTEuOTgyOSAxMTguOTI0QzUxLjk4MjkgMTIwLjcwMyA1NC4xMzEyIDEyMS41OTcgNTUuMzkzNyAxMjAuMzQzTDEwMC4wNTMgNzUuOTkzWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzM3OTVfMjU1NDMpIi8+CjxwYXRoIGQ9Ik0yNy45NDcgNTIuMTYwMUg0NC42ODM5QzQ4LjcxNDcgNTIuMTYwMSA1MS45ODIyIDU1LjQyNzYgNTEuOTgyMiA1OS40NTgzVjc2LjEyNjlIMzUuMjQ1M0MzMS4yMTQ2IDc2LjEyNjkgMjcuOTQ3IDcyLjg1OTQgMjcuOTQ3IDY4LjgyODdWNTIuMTYwMVoiIGZpbGw9IiNGMUYwRkYiLz4KPHBhdGggZD0iTTc2LjAxNzggNTIuMTYwMUg5Mi43NTQ3Qzk2Ljc4NTUgNTIuMTYwMSAxMDAuMDUzIDU1LjQyNzYgMTAwLjA1MyA1OS40NTgzVjc2LjEyNjlIODMuMzE2MUM3OS4yODU0IDc2LjEyNjkgNzYuMDE3OCA3Mi44NTk0IDc2LjAxNzggNjguODI4N1Y1Mi4xNjAxWiIgZmlsbD0iI0YxRjBGRiIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzM3OTVfMjU1NDMiIHgxPSI1MS45ODMxIiB5MT0iNy4wNzE1NSIgeDI9IjUxLjk4MzEiIHkyPSI3Ni4xMjY4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNBOEFERkYiLz4KPHN0b3Agb2Zmc2V0PSIwLjY0ODU1NiIgc3RvcC1jb2xvcj0id2hpdGUiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzM3OTVfMjU1NDMiIHgxPSI3Ni4wMTgiIHkxPSI1MS45NTgiIHgyPSI3Ni4wMTgiIHkyPSIxMjAuOTI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMC4yNjA3ODQiIHN0b3AtY29sb3I9IiNCNkJBRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTRFMkZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
  'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMyAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYuNSIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzAzNjRGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjIxODYgOS40OTIxOUMxMC40NTM5IDkuNDkyMTkgOS44MzM5OCAxMC4xMTIxIDkuODMzOTggMTAuODc2OFYxMi40ODk4QzkuODMzOTggMTMuMjU0NSAxMC40NTM5IDEzLjg3NDQgMTEuMjE4NiAxMy44NzQ0SDEzLjY2ODRWMjIuODk3NkMxMy42Njg0IDIzLjY2MjMgMTQuMjg4MyAyNC4yODIyIDE1LjA1MyAyNC4yODIySDE2LjY2NkMxNy40MzA3IDI0LjI4MjIgMTguMDUwNiAyMy42NjIzIDE4LjA1MDYgMjIuODk3NlYxMi41MDE1QzE4LjA1MDYgMTIuNDk3NiAxOC4wNTA2IDEyLjQ5MzcgMTguMDUwNiAxMi40ODk4VjEwLjg3NjhDMTguMDUwNiAxMC4xMTIxIDE3LjQzMDcgOS40OTIxOSAxNi42NjYgOS40OTIxOUgxNS4wNTNIMTEuMjE4NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMS4zMzc2IDEzLjg3NDRDMjIuNTQ3NyAxMy44NzQ0IDIzLjUyODcgMTIuODkzNCAyMy41Mjg3IDExLjY4MzNDMjMuNTI4NyAxMC40NzMyIDIyLjU0NzcgOS40OTIxOSAyMS4zMzc2IDkuNDkyMTlDMjAuMTI3NSA5LjQ5MjE5IDE5LjE0NjUgMTAuNDczMiAxOS4xNDY1IDExLjY4MzNDMTkuMTQ2NSAxMi44OTM0IDIwLjEyNzUgMTMuODc0NCAyMS4zMzc2IDEzLjg3NDRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzUgMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTIzLjU4OCAwaC0xNnYyMS41ODNoMjEuNnYtMTZhNS41ODUgNS41ODUgMCAwIDAgLTUuNi01LjU4M3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5KSIvPjxwYXRoIGQ9Im04LjM0MiAwaC0yLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCAtNS41ODUgNS41ODV2Mi43NTdoOC4zNDJ6Ii8+PHBhdGggZD0ibTAgNy41OWg4LjM0MnY4LjM0MmgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDUuNzM5KSIvPjxwYXRoIGQ9Im0xNS4xOCAyMy40NTFoMi43NTdhNS41ODUgNS41ODUgMCAwIDAgNS41ODUtNS42di0yLjY3MWgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS40NzggMTEuNDc4KSIvPjxwYXRoIGQ9Im03LjU5IDE1LjE4aDguMzQydjguMzQyaC04LjM0MnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5IDExLjQ3OCkiLz48cGF0aCBkPSJtMCAxNS4xOHYyLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCA1LjU4NSA1LjU4NWgyLjc1N3YtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDExLjQ3OCkiLz48L2c+PC9zdmc+',
  'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUzMCIgd2lkdGg9IjUzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtLTEtMWg1MzJ2NTMyaC01MzJ6IiBmaWxsPSJub25lIi8+PGcgZmlsbD0iIzAwZmZhMyI+PHBhdGggZD0ibTg4Ljg4OTM1IDM3Mi45ODIwMWMzLjE5My0zLjE5IDcuNTIyLTQuOTgyIDEyLjAzNS00Ljk4Mmg0MTYuNDYxYzcuNTg2IDAgMTEuMzg0IDkuMTc0IDYuMDE3IDE0LjUzNmwtODIuMjkxIDgyLjIyNmMtMy4xOTMgMy4xOTEtNy41MjIgNC45ODMtMTIuMDM2IDQuOTgzaC00MTYuNDYwMWMtNy41ODY2IDAtMTEuMzg0NS05LjE3NC02LjAxNzgtMTQuNTM3bDgyLjI5MTktODIuMjI2eiIvPjxwYXRoIGQ9Im04OC44ODkzNSA2NS45ODI1YzMuMTkzLTMuMTkwNCA3LjUyMi00Ljk4MjUgMTIuMDM1LTQuOTgyNWg0MTYuNDYxYzcuNTg2IDAgMTEuMzg0IDkuMTczOSA2LjAxNyAxNC41MzYzbC04Mi4yOTEgODIuMjI2N2MtMy4xOTMgMy4xOS03LjUyMiA0Ljk4Mi0xMi4wMzYgNC45ODJoLTQxNi40NjAxYy03LjU4NjYgMC0xMS4zODQ1LTkuMTc0LTYuMDE3OC0xNC41MzZsODIuMjkxOS04Mi4yMjY1eiIvPjxwYXRoIGQ9Im00NDEuMTExMzUgMjE5LjEwOTVjLTMuMTkzLTMuMTktNy41MjItNC45ODItMTIuMDM2LTQuOTgyaC00MTYuNDYwMWMtNy41ODY2IDAtMTEuMzg0NSA5LjE3My02LjAxNzggMTQuNTM2bDgyLjI5MTkgODIuMjI2YzMuMTkzIDMuMTkgNy41MjIgNC45ODMgMTIuMDM1IDQuOTgzaDQxNi40NjFjNy41ODYgMCAxMS4zODQtOS4xNzQgNi4wMTctMTQuNTM3eiIvPjwvZz48L3N2Zz4=',
  'data:image/png;base64,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',
];

function Block({ isOpen, title, onToggle, duration = '500ms', children }) {
  return (
    <div className="block">
      <Collapse
        // style={{ transitionDuration: '2700ms' }}
        transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`}
        isOpen={isOpen}
      >
        {children}
      </Collapse>
      <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
        <button
          className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
          type="button"
          onClick={onToggle}
        >
          {isOpen ? (
            <div>
              Less options
              <svg
                className="less-svgIcon"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ExpandLessIcon"
              >
                <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
              </svg>
            </div>
          ) : (
            <div>
              More options
              <svg
                className="less-svgIcon"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ExpandMoreIcon"
              >
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>{' '}
            </div>
          )}
          {/* MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv */}
          {/* <svg
            className="less-svgIcon"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ExpandLessIcon"
          >
            <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
          </svg> */}
        </button>
      </li>

      {/* <button className="btn toggle" onClick={onToggle}>
        <Down isOpen={isOpen} />
      </button> */}
    </div>
  );
}

const Modal = (props) => {
  const handleModalButtonClick = (imgSrc, title, isEnabled) => {
    props.handleClickInModal(imgSrc, title, isEnabled);
    props.handleCloseModal();
  };

  const ModalHeader = () => {
    return (
      <div className="modal__header">
        <h2>Select your wallet</h2>
        <div>
          <button className="close-button" onClick={props.handleCloseModal}>
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CloseIcon"
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const ModalBody = () => {
    return (
      <div className="modal__body">
        <ul className="list-root list-padding css-1ontqvh">
          <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
            <button
              className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
              type="button"
              onClick={() =>
                handleModalButtonClick(imgSrcs[0], 'CONNECT', true)
              }
            >
              Phantom
              <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                <img
                  src={imgSrcs[0]}
                  alt="Phantom icon"
                  className="listItem__image"
                />
              </span>
            </button>
          </li>
          <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
            <button
              className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
              type="button"
              onClick={() =>
                handleModalButtonClick(imgSrcs[1], 'CONNECT', true)
              }
            >
              Slope
              <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                <img
                  src={imgSrcs[1]}
                  alt="Slope icon"
                  className="listItem__image"
                />
              </span>
            </button>
          </li>
          <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
            <button
              className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
              type="button"
              onClick={() =>
                handleModalButtonClick(imgSrcs[2], 'CONNECTING ...', false)
              }
            >
              Solflare
              <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                <img
                  src={imgSrcs[2]}
                  alt="Solflare icon"
                  className="listItem__image"
                />
              </span>
            </button>
          </li>
        </ul>
        <Block
          title="Handling instructions"
          // isOpen={isCollapsing}
          // onToggle={() => {
          //   setIsCollapsing(!isCollapsing);
          // }}
          isOpen={props.isLessMode}
          onToggle={() => {
            props.setIsLessMode(!props.isLessMode);
          }}

          // onToggle={() => dispatch({ type: 'toggle', index: 2 })}
        >
          <ul className="list-root list-padding css-1ontqvh">
            <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
              <button
                className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
                type="button"
                onClick={() =>
                  handleModalButtonClick(imgSrcs[3], 'CONNECTING ...', false)
                }
              >
                Torus
                <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                  <img
                    src={imgSrcs[3]}
                    alt="Torus icon"
                    className="listItem__image"
                  />
                </span>
              </button>
            </li>
            <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
              <button
                className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
                type="button"
                onClick={() =>
                  handleModalButtonClick(imgSrcs[4], 'CONNECTING ...', false)
                }
              >
                Ledger
                <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                  <img
                    src={imgSrcs[4]}
                    alt="Ledger icon"
                    className="listItem__image"
                  />
                </span>
              </button>
            </li>
            <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
              <button
                className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
                type="button"
                onClick={() =>
                  handleModalButtonClick(imgSrcs[5], 'CONNECTING ...', false)
                }
              >
                Sollet
                <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                  <img
                    src={imgSrcs[5]}
                    alt="Sollet icon"
                    className="listItem__image"
                  />
                </span>
              </button>
            </li>
            <li className="listItem-root listItem-gutters listItem-padding css-1yo8bqd">
              <button
                className="button-root button-text button-textPrimary button-sizeMedium button-textSizeMedium buttonBase-root  css-1ujsas3"
                type="button"
                onClick={() =>
                  handleModalButtonClick(imgSrcs[6], 'CONNECT', true)
                }
              >
                Sollet (Extension)
                <span className="button-endIcon button-iconSizeMedium css-1n4a93h">
                  <img
                    src={imgSrcs[6]}
                    alt="Sollet (Extension) icon"
                    className="listItem__image"
                  />
                </span>
              </button>
            </li>
          </ul>
        </Block>
      </div>
    );
  };

  ReactModal.setAppElement('#root');

  return (
    <>
      <ReactModal
        isOpen={props.isShowModal}
        className="card__modal"
        contentLabel="Minimal Modal Example"
      >
        <ModalHeader />
        <ModalBody />
      </ReactModal>
    </>
  );
};

const props = {};

export default Modal;
