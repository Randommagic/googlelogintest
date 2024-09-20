import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Callback() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});
  const [tokenInfo, setTokenInfo] = useState(null); // 토큰 정보를 저장할 상태 추가
  const [error, setError] = useState(null); // 에러 메시지 상태

  useEffect(() => {
    // 현재 URL의 query parameter 가져오기
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const scope = params.get("scope");
    const authuser = params.get("authuser");
    const prompt = params.get("prompt");

    // query parameter를 상태로 저장
    setQueryParams({ code, scope, authuser, prompt });

    // console에 출력하여 확인
    console.log("Code:", code);
    console.log("Scope:", scope);
    console.log("Auth User:", authuser);
    console.log("Prompt:", prompt);

    // code가 존재하면 백엔드로 요청 보내기
    if (code) {
      // 백엔드 API 호출
      // fetch("https://localhost:8000/auth/login/google/callback", {
      fetch("https://api.randommagic.xyz/auth/login/google/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // code를 body에 넣어서 전송
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch token info");
          }
          return response.json();
        })
        .then((data) => {
          setTokenInfo(data); // 토큰 정보를 상태로 저장
        })
        .catch((err) => {
          setError(err.message); // 에러 메시지 상태로 저장
        });
    }
  }, [location]);

  return (
    <div className="callback">
      <h1>Google Login Callback</h1>
      <p>Google 로그인 인증 코드가 전달되었습니다.</p>
      <ul>
        <li>
          <strong>Code:</strong> {queryParams.code}
        </li>
        <li>
          <strong>Scope:</strong> {queryParams.scope}
        </li>
        <li>
          <strong>Auth User:</strong> {queryParams.authuser}
        </li>
        <li>
          <strong>Prompt:</strong> {queryParams.prompt}
        </li>
      </ul>

      {tokenInfo ? (
        <div>
          <h2>Token Information</h2>
          <ul>
            <li>
              <strong>Access Token:</strong> {tokenInfo.accessToken}
            </li>
            <li>
              <strong>Refresh Token:</strong> {tokenInfo.refreshToken}
            </li>
          </ul>
        </div>
      ) : error ? (
        <div style={{ color: "red" }}>
          <p>토큰 정보를 가져오는데 실패했습니다: {error}</p>
        </div>
      ) : (
        <p>토큰 정보를 가져오는 중...</p>
      )}
    </div>
  );
}

export default Callback;
