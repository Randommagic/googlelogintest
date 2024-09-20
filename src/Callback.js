import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Callback() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState({});
  const [tokenInfo, setTokenInfo] = useState(null);
  const [error, setError] = useState(null);

  // 쿼리 파라미터를 가져와 상태에 저장
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const scope = params.get("scope");
    const authuser = params.get("authuser");
    const prompt = params.get("prompt");

    setQueryParams({ code, scope, authuser, prompt });
  }, [location.search]);

  // API 호출 버튼 클릭 핸들러
  const handleApiRequest = () => {
    const { code } = queryParams;
    if (!code) {
      setError("No code available to request token.");
      return;
    }

    // API 요청
    // fetch("http://localhost:8000/auth/login/google/callback", {
    fetch("https://api.randommagic.xyz/auth/login/google/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch token info");
        }
        return response.json();
      })
      .then((data) => {
        setTokenInfo(data); // 토큰 정보를 상태로 저장
        setError(null); // 에러 상태 초기화
      })
      .catch((err) => {
        setError(err.message); // 에러 메시지 상태로 저장
        setTokenInfo(null); // 토큰 정보 초기화
      });
  };

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

      <button onClick={handleApiRequest} className="api-request-button">
        서버로 JWT 토큰 요청
      </button>

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
        <p>토큰 정보를 가져오려면 위의 버튼을 클릭하세요.</p>
      )}
    </div>
  );
}

export default Callback;
