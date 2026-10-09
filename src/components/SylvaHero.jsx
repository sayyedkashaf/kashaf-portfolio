import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './SylvaHero.css';

export function SylvaHero({
  variant = 'living-green',
  headingFont = 'lexend',
  bodyFont = 'lexend',
  headingWeight = '300',
  bodyWeight = '300',
  primaryColor = '#ffffff',
  headingSize = 61,
  bodySize = 16,
  headingLetterSpacing = -0.006,
  onOpenResume,
  theme,
  toggleTheme,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    let cleanupFns = [];
    let isDisposed = false;

    // Add .js and .is-ready classes
    rootEl.classList.add('js');
    const timerReady = setTimeout(() => {
      if (!isDisposed && rootEl) {
        rootEl.classList.add('is-ready');
      }
    }, 50);
    const timerDone = setTimeout(() => {
      if (!isDisposed && rootEl) {
        rootEl.classList.add('intro-done');
      }
    }, 2900);

    cleanupFns.push(() => {
      clearTimeout(timerReady);
      clearTimeout(timerDone);
    });

    /* =====================================================================
       1. Liquid Metal WebGL2 Shader System
       ===================================================================== */
    function mountLiquidMetal(host) {
      if (!host) return null;
      const cv = host.querySelector('.liquid-fx');
      const btn = host.querySelector('.liquid-button');
      if (!cv || !btn) return null;

      const gl = cv.getContext('webgl2', {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: 'high-performance',
      });
      if (!gl) return null;

      const VERT = `#version 300 es
in vec2 position; void main(){ gl_Position = vec4(position,0.,1.); }`;

      const HEAD = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2  uC;
uniform vec2  uHalf;
uniform float uT;
uniform float uHover;
uniform float uPress;
uniform vec4  uRip[3];
uniform vec4  uRipK;
uniform vec4  uRipK2;
uniform vec4  uPtr;
uniform vec4  uPtrK;
#define PI 3.14159265
float sdPill(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return min(max(q.x,q.y),0.) + length(max(q,0.)) - r;
}
float ripple(vec2 p, float t){
  float sum = 0.;
  for(int i = 0; i < 3; i++){
    if(uRip[i].w < 0.5) continue;
    float age = t - uRip[i].z;
    if(age < 0. || age > 4.) continue;
    vec2  rp = p - uRip[i].xy;
    float facet = 1. + uRipK2.x * cos(uRipK2.y * atan(rp.y, rp.x) + age * 2.1 + float(i) * 2.4);
    float x = (length(rp) - age * uRipK.x * facet) / uRipK.y;
    sum += exp(-pow(abs(x) + 1e-4, uRipK2.z)) * exp(-age * uRipK.z);
  }
  return sum;
}
float pointerW(vec2 p){
  if(uPtr.z < 0.001) return 0.;
  float d = length(p - uPtr.xy) / uPtrK.x;
  return exp(-d*d) * uPtr.z;
}
vec2 pointerWarp(vec2 p){
  float w = pointerW(p);
  if(w <= 0.) return vec2(0.);
  return normalize(p - uPtr.xy + vec2(1e-5)) * w * (uPtrK.y + uPtrK.z * uPtr.w);
}`;

      const FRAG_RIM =
        HEAD +
        `
uniform float uBw;
uniform float uE[8];
float perim(vec2 d, float a, float r){
  float P = 4.*a + 2.*PI*r;
  float s;
  if(d.x >= a){
    float th = atan(d.y, d.x - a); if(th < 0.) th += 2.*PI;
    s = (th <= PI*0.5) ? r*th : P - r*(2.*PI - th);
  } else if(d.x <= -a){
    float th = atan(d.y, d.x + a); if(th < 0.) th += 2.*PI;
    s = r*PI*0.5 + 2.*a + r*(th - PI*0.5);
  } else if(d.y >= 0.){
    s = r*PI*0.5 + (a - d.x);
  } else {
    s = r*PI*1.5 + 2.*a + (d.x + a);
  }
  return s / P;
}
float pb(float u, float w){ u = fract(u); float x = min(u, 1.-u); return exp(-(x*x)/(w*w)); }
float rimHot(float s, float t){
  float v = uE[0];
  v += 0.62 * pb(s - t*uE[4],             0.075);
  v += 0.44 * pb(s + t*uE[4]*0.63 + 0.41, 0.135);
  v += 0.30 * pb(s - t*uE[4]*0.34 + 0.73, 0.200);
  return v;
}
float rimBand(float sd, float off){ return 1. - smoothstep(0., uBw*1.05, abs(sd + uBw*0.55 + off)); }
void main(){
  vec2  d  = gl_FragCoord.xy - uC;
  float sd = sdPill(d, uHalf, uHalf.y);
  if(sd > uBw*2.5 || sd < -uBw*3.5){ o = vec4(0.); return; }
  float a = max(uHalf.x - uHalf.y, 0.);
  float s = perim(d, a, uHalf.y);
  float top = mix(1., 0.5 + 0.5 * (d.y / uHalf.y), uE[5]);
  vec2  p   = vec2(d.x, -d.y) / (uHalf.y * 2.);
  float lift = 1. + uPress * uE[6] + ripple(p, uT) * uE[7] + pointerW(p) * uPtrK.w;
  o = vec4(vec3(
    rimBand(sd,  uE[2]) * rimHot(s + uE[3], uT),
    rimBand(sd,  0.   ) * rimHot(s,         uT),
    rimBand(sd, -uE[2]) * rimHot(s - uE[3], uT)
  ) * uE[1] * top * lift, 1.);
}`;

      const FRAG_SCENE =
        HEAD +
        `
uniform float uP[21];
float h21(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vn(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.-2.*f);
  float a = h21(i), b = h21(i+vec2(1,0)), c = h21(i+vec2(0,1)), d = h21(i+vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y) * 2. - 1.;
}
float fbm(vec2 p, float g){
  float s = 0., a = 1., n = 0.;
  for(int i=0;i<4;i++){ s += a*vn(p); n += a; p = p*2.03 + 11.7; a *= g; }
  return s / n;
}
float fbm(vec2 p){ return fbm(p, 0.5); }
float wig(float x, float t, float seed){
  return vn(vec2(x,          t*0.150 + seed)) * 0.60
       + vn(vec2(x*2.07 + 4., t*0.105 + seed)) * 0.27
       + vn(vec2(x*4.30 - 7., t*0.080 + seed)) * 0.13;
}
float valleyAt(vec2 p, float t){ return wig(p.x*uP[0], t, 0.0) * uP[1]; }
float densAt  (vec2 p, float t){ return uP[2] * exp(uP[3] * wig(p.x*uP[4] + 9.0, t, 2.7)); }
float surface(vec2 p, float t){
  float V = (p.y - valleyAt(p,t)) * densAt(p,t);
  V += uP[5] * fbm(p*vec2(0.8, 1.7)*uP[6] + vec2(t*0.05, -t*0.03), uP[17]);
  return V - uP[7];
}
float tone(float v){
  float u = fract(v);
  float e = uP[9], W = uP[10] * 0.5;
  return smoothstep(0.5-W-e, 0.5-W, u) * (1. - smoothstep(0.5+W, 0.5+W+e, u));
}
vec3 spec(float t){ return clamp(vec3(1.5) - abs(4.*t - vec3(3.,2.,1.)), 0., 1.); }
void main(){
  vec2  d  = gl_FragCoord.xy - uC;
  float sd = sdPill(d, uHalf, uHalf.y);
  float pill = 1. - smoothstep(-1., 1., sd);
  float S = uHalf.y * 2.;
  float t = uT;
  if(uHover <= 0.0015 || pill <= 0.0015){ o = vec4(0., 0., 0., pill); return; }
  vec2  p = vec2(d.x, -d.y) / S;
  vec2  q = p + pointerWarp(p);
  float h0 = surface(q, t);
  vec2  gp = vec2(dFdx(h0), -dFdy(h0)) * S;
  float V  = surface(q - gp * uP[8] / max(uP[2], .001), t);
  vec2  gd = normalize(gp + vec2(1e-5));
  V += uP[13] * fbm(vec2(dot(q,gd)*uP[14], dot(q, vec2(-gd.y,gd.x))*uP[14]*0.04) + vec2(0., t*0.06));
  float rip  = ripple(p, t);
  float well = pointerW(p);
  V += rip * uRipK.w;
  const int N = 21;
  float mid = 1. - pow(0.5, uP[12]);
  vec3 col = vec3(0.), wsum = vec3(0.);
  for(int i=0;i<N;i++){
    float k = float(i)/float(N-1);
    vec3  w = spec(k);
    col  += w * tone(V + ((1. - pow(1. - k, uP[12])) - mid) * uP[11]);
    wsum += w;
  }
  col /= wsum;
  col = pow(col, vec3(uP[15]));
  float lit = smoothstep(uP[18], uP[19], q.y - valleyAt(q, t));
  lit *= mix(1., lit, 0.55);
  col *= uP[16] * lit;
  col = col * (1. + rip * 1.15 + well * 0.60);
  o = vec4(col * pill * uHover, pill);
}`;

      const FRAG_DOWN = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uTex, uTex2;
uniform vec2 uDstTexel;
uniform vec2 uSrcTexel;
uniform float uAdd;
void main(){
  vec2 uv = gl_FragCoord.xy * uDstTexel;
  vec2 e = uDstTexel * 0.25;
  vec4 s = texture(uTex, uv + vec2(-e.x,-e.y)) + texture(uTex, uv + vec2( e.x,-e.y))
         + texture(uTex, uv + vec2(-e.x, e.y)) + texture(uTex, uv + vec2( e.x, e.y));
  s *= 0.25;
  if(uAdd > 0.5){
    vec4 r = texture(uTex2, uv + vec2(-e.x,-e.y)) + texture(uTex2, uv + vec2( e.x,-e.y))
           + texture(uTex2, uv + vec2(-e.x, e.y)) + texture(uTex2, uv + vec2( e.x, e.y));
    s.rgb += r.rgb * 0.25;
  }
  o = s;
}`;

      const FRAG_BLUR = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uTex; uniform vec2 uTexel; uniform vec2 uDir; uniform float uR;
void main(){
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec2 st = uTexel * uDir * uR;
  vec4 s = texture(uTex, uv) * 0.1964;
  s += (texture(uTex, uv + st*1.4118) + texture(uTex, uv - st*1.4118)) * 0.2969;
  s += (texture(uTex, uv + st*3.2941) + texture(uTex, uv - st*3.2941)) * 0.0944;
  s += (texture(uTex, uv + st*5.1765) + texture(uTex, uv - st*5.1765)) * 0.0104;
  o = s;
}`;

      const FRAG_COMP =
        HEAD +
        `
uniform sampler2D uSoft, uRim, uGlow;
uniform vec2  uRes;
uniform float uGlowGain, uGlowIn, uOccl, uDim, uPunch;
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec3 glow = texture(uGlow, uv).rgb;
  vec2  d    = gl_FragCoord.xy - uC;
  float sd   = sdPill(d, uHalf, uHalf.y);
  float pill = 1. - smoothstep(-1., 1., sd);
  vec4 m = texture(uSoft, uv);
  float veil = 1. - smoothstep(0.46, 0.88, abs(d.y) / uHalf.y);
  vec3 metal = pow(max(m.rgb / max(m.a, 1e-3), 0.), vec3(uPunch));
  vec3 core = metal * pill * mix(1., uDim, veil) + texture(uRim, uv).rgb;
  float rip = ripple(vec2(d.x, -d.y) / (uHalf.y * 2.), uT);
  core += vec3(rip * rip) * uRipK2.w * pill * mix(1., 0.42, veil);
  float sdSh = sdPill(d + vec2(0., uHalf.y * 0.62), uHalf * 0.94, uHalf.y * 0.94);
  float occl = uOccl * exp(-max(sdSh, 0.) / (uHalf.y * 0.75));
  vec3 rgb = core + glow * uGlowGain * mix(1., uGlowIn, pill) * (1. - occl * (1. - pill));
  float a = clamp(max(rgb.r, max(rgb.g, rgb.b)), 0., 1.);
  o = vec4(min(rgb, vec3(1.)), a);
}`;

      function sh(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }
      function prog(fs) {
        const p = gl.createProgram();
        gl.attachShader(p, sh(gl.VERTEX_SHADER, VERT));
        gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs));
        gl.bindAttribLocation(p, 0, 'position');
        gl.linkProgram(p);
        const u = {};
        const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < n; i++) {
          const info = gl.getActiveUniform(p, i);
          u[info.name.replace('[0]', '')] = gl.getUniformLocation(p, info.name);
        }
        return { p, u };
      }

      const pScene = prog(FRAG_SCENE),
        pRim = prog(FRAG_RIM),
        pDown = prog(FRAG_DOWN),
        pBlur = prog(FRAG_BLUR),
        pComp = prog(FRAG_COMP);

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      const vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      function makeTarget() {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        return { tex, fbo, w: 0, h: 0 };
      }
      function sizeTarget(t, w, h) {
        if (t.w === w && t.h === h) return;
        t.w = w;
        t.h = h;
        gl.bindTexture(gl.TEXTURE_2D, t.tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }

      const T_core = makeTarget(),
        T_rim = makeTarget(),
        T_s1 = makeTarget(),
        T_s2 = makeTarget(),
        T_a = makeTarget(),
        T_b = makeTarget();

      let W = 0,
        H = 0,
        DPR = 1,
        BW = 0,
        BH = 0,
        CX = 0,
        CY = 0;
      let DOWN = 4;
      const GLOW_TEX = 129;
      let needResize = true;

      function resize() {
        const r = host.getBoundingClientRect();
        const br = btn.getBoundingClientRect();
        DPR = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(2, Math.round(r.width * DPR));
        const h = Math.max(2, Math.round(r.height * DPR));
        if (w !== W || h !== H) {
          W = w;
          H = h;
          cv.width = W;
          cv.height = H;
        }
        BW = br.width * DPR;
        BH = br.height * DPR;
        CX = (br.left - r.left) * DPR + BW / 2;
        CY = H - ((br.top - r.top) * DPR + BH / 2);
        sizeTarget(T_core, W, H);
        sizeTarget(T_rim, W, H);
        const hw = Math.max(2, Math.ceil(W / 2)),
          hh = Math.max(2, Math.ceil(H / 2));
        sizeTarget(T_s1, hw, hh);
        sizeTarget(T_s2, hw, hh);
        DOWN = Math.max(1, Math.min(4, Math.round(BH / GLOW_TEX)));
        const dw = Math.max(2, Math.ceil(W / DOWN)),
          dh = Math.max(2, Math.ceil(H / DOWN));
        sizeTarget(T_a, dw, dh);
        sizeTarget(T_b, dw, dh);
        needResize = false;
      }

      const resObs = new ResizeObserver(() => {
        needResize = true;
      });
      resObs.observe(host);

      function drawTo(t) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, t ? t.fbo : null);
        gl.viewport(0, 0, t ? t.w : W, t ? t.h : H);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      const P = {
        valFreq: 0.5,
        valAmp: 0.55,
        dens: 2.4,
        densVar: 2.2,
        densFreq: 0.32,
        wobAmp: 0.12,
        wobFreq: 1.6,
        lift: 0.05,
        refract: 0.18,
        edge: 0.04,
        width: 0.46,
        disp: 0.3,
        skew: 1.5,
        fineAmp: 0.0,
        fineFreq: 9.0,
        gamma: 1.0,
        gain: 1.9,
        octGain: 0.32,
        litLo: -0.26,
        litHi: 0.1,
        dim: 0.44,
      };
      const PKEYS = Object.keys(P);
      const E = {
        base: 0.2,
        hot: 0.82,
        chromA: 0.42,
        chromS: 0.03,
        speed: 0.07,
        top: 0.35,
        press: 0.85,
        ripple: 1.6,
      };
      const EKEYS = Object.keys(E);
      const C = {
        glow: host.dataset.liquidMetal === 'play' ? 1.28 : 1.95,
        glowR: host.dataset.liquidMetal === 'play' ? 0.94 : 1.3,
        glowIn: 0.3,
        occl: 0.62,
        soften: 0.24,
        punch: 1.5,
      };
      const R = {
        speed: 1.85,
        width: 0.2,
        decay: 1.35,
        amp: 1.35,
        facet: 0.18,
        lobes: 6.0,
        sharp: 1.15,
        emit: 0.45,
        ptrRad: 0.55,
        ptrAmp: 0.32,
        ptrFast: 0.4,
        ptrRim: 0.8,
        ptrLag: 0.0016,
        ptrVref: 4.5,
      };

      const uArr = new Float32Array(PKEYS.length);
      const eArr = new Float32Array(EKEYS.length);
      let hover = 0,
        hoverTarget = 0,
        clock = 0,
        last = performance.now();
      const RIP = [0, 1, 2].map(() => ({ x: 0, y: 0, t: -99, on: 0 }));
      const ripArr = new Float32Array(12);
      let ripNext = 0,
        press = 0,
        pressTarget = 0;
      const ptr = { x: 0, y: 0 },
        ptrS = { x: 0, y: 0 };
      let ptrAmt = 0,
        ptrSpeed = 0;

      function addRipple(x, y) {
        const r = RIP[ripNext];
        ripNext = (ripNext + 1) % RIP.length;
        r.x = x;
        r.y = y;
        r.t = clock;
        r.on = 1;
      }
      function localPt(e) {
        const b = btn.getBoundingClientRect(),
          s = b.height;
        return [(e.clientX - (b.left + b.width / 2)) / s, (e.clientY - (b.top + b.height / 2)) / s];
      }

      let animId = null;
      function frame(now) {
        if (isDisposed) return;
        const dtRaw = (now - last) / 1000;
        last = now;
        const dt = Math.min(dtRaw, 1 / 20);
        clock += dt;

        const k = hoverTarget > hover ? 1 - Math.pow(0.0012, dt) : 1 - Math.pow(0.00012, dt);
        hover += (hoverTarget - hover) * k;
        const pk = pressTarget > press ? 1 - Math.pow(1e-9, dt) : 1 - Math.pow(0.004, dt);
        press += (pressTarget - press) * pk;

        for (let i = 0; i < RIP.length; i++) {
          const r = RIP[i];
          if (r.on && clock - r.t > 4) r.on = 0;
          ripArr[i * 4] = r.x;
          ripArr[i * 4 + 1] = r.y;
          ripArr[i * 4 + 2] = r.t;
          ripArr[i * 4 + 3] = r.on;
        }

        const lag = 1 - Math.pow(R.ptrLag, dt);
        ptrS.x += (ptr.x - ptrS.x) * lag;
        ptrS.y += (ptr.y - ptrS.y) * lag;

        if (needResize) resize();

        for (let i = 0; i < uArr.length; i++) uArr[i] = P[PKEYS[i]];
        for (let i = 0; i < eArr.length; i++) eArr[i] = E[EKEYS[i]];
        const bw = Math.max(1.5, 3.2 * (BH / 516));

        gl.useProgram(pScene.p);
        gl.uniform2f(pScene.u.uC, CX, CY);
        gl.uniform2f(pScene.u.uHalf, BW / 2, BH / 2);
        gl.uniform1f(pScene.u.uT, clock);
        gl.uniform1f(pScene.u.uHover, hover);
        gl.uniform1f(pScene.u.uPress, press);
        gl.uniform4fv(pScene.u.uRip, ripArr);
        gl.uniform4f(pScene.u.uRipK, R.speed, R.width, R.decay, R.amp);
        gl.uniform4f(pScene.u.uRipK2, R.facet, R.lobes, R.sharp, R.emit);
        gl.uniform4f(pScene.u.uPtr, ptrS.x, ptrS.y, ptrAmt, ptrSpeed);
        gl.uniform4f(pScene.u.uPtrK, R.ptrRad, R.ptrAmp, R.ptrFast, R.ptrRim);
        gl.uniform1fv(pScene.u.uP, uArr);
        drawTo(T_core);

        gl.useProgram(pRim.p);
        gl.uniform2f(pRim.u.uC, CX, CY);
        gl.uniform2f(pRim.u.uHalf, BW / 2, BH / 2);
        gl.uniform1f(pRim.u.uT, clock);
        gl.uniform1f(pRim.u.uBw, bw);
        gl.uniform1f(pRim.u.uPress, press);
        gl.uniform4fv(pRim.u.uRip, ripArr);
        gl.uniform4f(pRim.u.uRipK, R.speed, R.width, R.decay, R.amp);
        gl.uniform4f(pRim.u.uRipK2, R.facet, R.lobes, R.sharp, R.emit);
        gl.uniform4f(pRim.u.uPtr, ptrS.x, ptrS.y, ptrAmt, ptrSpeed);
        gl.uniform4f(pRim.u.uPtrK, R.ptrRad, R.ptrAmp, R.ptrFast, R.ptrRim);
        gl.uniform1fv(pRim.u.uE, eArr);
        drawTo(T_rim);

        gl.useProgram(pDown.p);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, T_core.tex);
        gl.uniform1i(pDown.u.uTex, 0);
        gl.uniform1f(pDown.u.uAdd, 0);
        gl.uniform2f(pDown.u.uDstTexel, 1 / T_s1.w, 1 / T_s1.h);
        gl.uniform2f(pDown.u.uSrcTexel, 1 / W, 1 / H);
        drawTo(T_s1);

        gl.useProgram(pBlur.p);
        gl.uniform1i(pBlur.u.uTex, 0);
        gl.uniform2f(pBlur.u.uTexel, 1 / T_s1.w, 1 / T_s1.h);
        const sigTex = C.soften * (BH * 0.5) * 0.95;
        if (sigTex > 0.1) {
          const iters = 2;
          gl.uniform1f(pBlur.u.uR, sigTex / Math.sqrt(iters) / 1.95);
          for (let i = 0; i < iters; i++) {
            gl.bindTexture(gl.TEXTURE_2D, T_s1.tex);
            gl.uniform2f(pBlur.u.uDir, 1, 0);
            drawTo(T_s2);
            gl.bindTexture(gl.TEXTURE_2D, T_s2.tex);
            gl.uniform2f(pBlur.u.uDir, 0, 1);
            drawTo(T_s1);
          }
        }

        gl.useProgram(pDown.p);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, T_s1.tex);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, T_rim.tex);
        gl.uniform1i(pDown.u.uTex, 0);
        gl.uniform1i(pDown.u.uTex2, 1);
        gl.uniform1f(pDown.u.uAdd, 1);
        gl.uniform2f(pDown.u.uDstTexel, 1 / T_a.w, 1 / T_a.h);
        gl.uniform2f(pDown.u.uSrcTexel, 1 / T_s1.w, 1 / T_s1.h);
        drawTo(T_a);

        gl.useProgram(pComp.p);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, T_s1.tex);
        gl.uniform1i(pComp.u.uSoft, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, T_rim.tex);
        gl.uniform1i(pComp.u.uRim, 1);
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, T_a.tex);
        gl.uniform1i(pComp.u.uGlow, 2);
        gl.uniform2f(pComp.u.uRes, W, H);
        gl.uniform2f(pComp.u.uC, CX, CY);
        gl.uniform2f(pComp.u.uHalf, BW / 2, BH / 2);
        gl.uniform1f(pComp.u.uT, clock);
        gl.uniform4fv(pComp.u.uRip, ripArr);
        gl.uniform4f(pComp.u.uRipK, R.speed, R.width, R.decay, R.amp);
        gl.uniform4f(pComp.u.uRipK2, R.facet, R.lobes, R.sharp, R.emit);
        gl.uniform1f(pComp.u.uGlowGain, C.glow);
        gl.uniform1f(pComp.u.uGlowIn, C.glowIn);
        gl.uniform1f(pComp.u.uOccl, C.occl);
        gl.uniform1f(pComp.u.uDim, P.dim);
        gl.uniform1f(pComp.u.uPunch, C.punch);
        drawTo(null);

        animId = requestAnimationFrame(frame);
      }

      const onEnter = e => {
        [ptr.x, ptr.y] = localPt(e);
        ptrS.x = ptr.x;
        ptrS.y = ptr.y;
        hoverTarget = 1;
        ptrAmt = 1;
        host.classList.add('hot');
      };
      const onLeave = () => {
        hoverTarget = 0;
        ptrAmt = 0;
        host.classList.remove('hot');
      };
      const onDown = e => {
        [ptr.x, ptr.y] = localPt(e);
        pressTarget = 1;
        host.classList.add('press');
        addRipple(ptr.x, ptr.y);
      };
      const onUp = () => {
        pressTarget = 0;
        host.classList.remove('press');
      };

      btn.addEventListener('pointerenter', onEnter);
      btn.addEventListener('pointerleave', onLeave);
      btn.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);

      resize();
      animId = requestAnimationFrame(frame);

      cleanupFns.push(() => {
        resObs.disconnect();
        cancelAnimationFrame(animId);
        btn.removeEventListener('pointerenter', onEnter);
        btn.removeEventListener('pointerleave', onLeave);
        btn.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
      });
    }

    const stageEl = rootEl.querySelector('.sylva-stage');
    const heroEl = rootEl.querySelector('.sylva-hero');
    const hosts = rootEl.querySelectorAll('[data-liquid-metal]');
    hosts.forEach(h => mountLiquidMetal(h));

    /* =====================================================================
       2. Proximity Magnification Dock & Specular Highlights
       ===================================================================== */
    const dockRoot = rootEl.querySelector('.sylva-dock');
    if (dockRoot) {
      const items = Array.from(dockRoot.querySelectorAll('[data-dock]'));
      const onMouseMove = e => {
        const rr = dockRoot.getBoundingClientRect();
        if (
          e.clientX > rr.left - 48 &&
          e.clientX < rr.right + 48 &&
          e.clientY > rr.top - 40 &&
          e.clientY < rr.bottom + 80
        ) {
          items.forEach(item => {
            const r = item.getBoundingClientRect();
            const d = Math.abs(e.clientX - (r.left + r.width / 2));
            const prox = Math.max(0, 1 - d / 120);
            const scale = prox * prox * (3 - 2 * prox);
            item.style.transform = `scale(${1 + scale * 0.22}) translateY(${-scale * 3}px)`;
            item.dataset.near = scale > 0.1 ? 'true' : 'false';
          });
        } else {
          items.forEach(item => {
            item.style.transform = '';
            item.dataset.near = 'false';
          });
        }
      };

      window.addEventListener('pointermove', onMouseMove, { passive: true });
      cleanupFns.push(() => window.removeEventListener('pointermove', onMouseMove));
    }

    /* =====================================================================
       2b. Dock Scrollspy — highlight the section currently in view
       ===================================================================== */
    const dockRootEl = rootEl.querySelector('.sylva-dock');
    if (dockRootEl) {
      const updateDockSpy = () => {
        const sectionIds = ['about', 'focus', 'education', 'projects', 'skills', 'contact'];
        const scrollPos = window.scrollY + Math.round(window.innerHeight * 0.35);
        let currentId = '';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) currentId = id;
        }
        const items = dockRootEl.querySelectorAll('a.sylva-dock-item');
        items.forEach(item => {
          const href = item.getAttribute('href') || '';
          item.classList.toggle('is-active', currentId !== '' && href === `#${currentId}`);
        });
      };
      window.addEventListener('scroll', updateDockSpy, { passive: true });
      updateDockSpy();
      cleanupFns.push(() => window.removeEventListener('scroll', updateDockSpy));
    }

    /* =====================================================================
       3. Parallax Pointer Movement
       ===================================================================== */
    let smooth = { x: 0, y: 0 },
      targetP = { x: 0, y: 0 };
    const onWinPointerMove = e => {
      targetP.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetP.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onWinPointerMove, { passive: true });

    let rafPar = null;
    function updateParallax() {
      if (isDisposed) return;
      smooth.x += (targetP.x - smooth.x) * 0.055;
      smooth.y += (targetP.y - smooth.y) * 0.055;
      if (heroEl) {
        heroEl.style.setProperty('--px', smooth.x.toFixed(4));
        heroEl.style.setProperty('--py', smooth.y.toFixed(4));
      }
      rafPar = requestAnimationFrame(updateParallax);
    }
    rafPar = requestAnimationFrame(updateParallax);
    cleanupFns.push(() => {
      window.removeEventListener('pointermove', onWinPointerMove);
      cancelAnimationFrame(rafPar);
    });

    /* =====================================================================
       4. Three.js Background Living Scene
       ===================================================================== */
    const canvas = rootEl.querySelector('#sylva-scene');
    if (canvas && heroEl) {
      let renderer, scene, camera, clock;
      let rafThree = null;

      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(40, 1, 10, 8000);
        camera.position.set(0, 0, 1400);
        clock = new THREE.Clock();

        // Ambient Light and Point Lights
        const amb = new THREE.AmbientLight(0xdcfce7, 0.9);
        scene.add(amb);
        const dir1 = new THREE.DirectionalLight(0xa7f3d0, 1.2);
        dir1.position.set(-300, 600, 400);
        scene.add(dir1);
        const dir2 = new THREE.DirectionalLight(0x38bdf8, 0.8);
        dir2.position.set(400, -300, 200);
        scene.add(dir2);

        // Living Organic 3D Roots
        const rootGroup = new THREE.Group();
        const archCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-800, -250, -50),
          new THREE.Vector3(-450, 20, 40),
          new THREE.Vector3(-100, 140, 80),
          new THREE.Vector3(260, 260, 30),
          new THREE.Vector3(580, 180, -40),
          new THREE.Vector3(850, -180, -120),
        ]);
        const tubeGeo = new THREE.TubeGeometry(archCurve, 120, 32, 16, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: 0x223525,
          roughness: 0.85,
          metalness: 0.15,
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        rootGroup.add(tubeMesh);

        // Secondary intertwining root
        const subCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-550, -320, 60),
          new THREE.Vector3(-200, -60, 110),
          new THREE.Vector3(150, 80, 100),
          new THREE.Vector3(480, 20, 20),
          new THREE.Vector3(760, -260, -60),
        ]);
        const subTubeGeo = new THREE.TubeGeometry(subCurve, 90, 18, 12, false);
        const subTubeMat = new THREE.MeshStandardMaterial({
          color: 0x18281b,
          roughness: 0.9,
          metalness: 0.1,
        });
        rootGroup.add(new THREE.Mesh(subTubeGeo, subTubeMat));

        // Instanced glowing spores / moss florets along root
        const COUNT_MOSS = 420;
        const floretGeo = new THREE.SphereGeometry(3.5, 6, 6);
        const floretMat = new THREE.MeshBasicMaterial({ color: 0x5eead4, wireframe: false });
        const floretInst = new THREE.InstancedMesh(floretGeo, floretMat, COUNT_MOSS);
        const dummy = new THREE.Object3D();

        for (let i = 0; i < COUNT_MOSS; i++) {
          const t = i / COUNT_MOSS;
          const pt = archCurve.getPointAt(t);
          const tan = archCurve.getTangentAt(t);
          const normal = new THREE.Vector3(-tan.y, tan.x, 0).normalize();
          const angle = Math.random() * Math.PI * 2;
          const radius = 32 + (Math.random() - 0.5) * 8;
          dummy.position.copy(pt).addScaledVector(normal, Math.cos(angle) * radius);
          dummy.position.z += Math.sin(angle) * radius;
          dummy.scale.setScalar(0.6 + Math.random() * 0.9);
          dummy.updateMatrix();
          floretInst.setMatrixAt(i, dummy.matrix);
        }
        floretInst.instanceMatrix.needsUpdate = true;
        rootGroup.add(floretInst);

        scene.add(rootGroup);

        // Drifting ambient pollen particles
        const P_COUNT = 900;
        const pPos = new Float32Array(P_COUNT * 3);
        for (let i = 0; i < P_COUNT; i++) {
          pPos[i * 3] = (Math.random() - 0.5) * 2600;
          pPos[i * 3 + 1] = (Math.random() - 0.5) * 1200;
          pPos[i * 3 + 2] = -250 + Math.random() * 600;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
          color: 0xa7f3d0,
          size: 4,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        function resizeThree() {
          const rect = heroEl.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          camera.aspect = rect.width / rect.height;
          camera.updateProjectionMatrix();
          renderer.setSize(rect.width, rect.height);
        }

        window.addEventListener('resize', resizeThree);
        resizeThree();

        function animateThree() {
          if (isDisposed) return;
          const dt = clock.getDelta();
          const time = clock.getElapsedTime();

          // Subtle natural motion
          rootGroup.rotation.y = Math.sin(time * 0.2) * 0.04;
          rootGroup.rotation.z = Math.cos(time * 0.15) * 0.02;

          // Pollen drift
          const pos = particles.geometry.attributes.position.array;
          for (let i = 0; i < P_COUNT; i++) {
            pos[i * 3 + 1] += Math.sin(time + i) * 0.2 + 0.3;
            if (pos[i * 3 + 1] > 600) pos[i * 3 + 1] = -600;
          }
          particles.geometry.attributes.position.needsUpdate = true;

          // Parallax camera easing
          camera.position.x = smooth.x * 55;
          camera.position.y = -smooth.y * 35;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
          rafThree = requestAnimationFrame(animateThree);
        }
        rafThree = requestAnimationFrame(animateThree);

        cleanupFns.push(() => {
          window.removeEventListener('resize', resizeThree);
          cancelAnimationFrame(rafThree);
          renderer.dispose();
        });
      } catch (err) {
        console.warn('Three.js scene init warning:', err);
      }
    }

    return () => {
      isDisposed = true;
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <div ref={containerRef} className="sylva-hero-wrapper">
      <div className="sylva-hero" id="hero">
        <canvas id="sylva-scene"></canvas>

        {/* ── Top Floating Glass Dock Navigation ────────────────────────── */}
        <div className="sylva-dock-wrap">
          <nav className="sylva-dock par-dock" data-spec aria-label="Primary Navigation">
            {/* Brand Monogram */}
            <a
              className="sylva-dock-item sylva-dock-mark"
              data-dock
              data-spec
              href="#hero"
              aria-label="Sayyed Kashaf Portfolio"
              title="Sayyed Kashaf — Data Science Student"
            >
              <span>SK</span>
            </a>

            {/* Section links */}
            <a className="sylva-dock-item" data-dock data-spec href="#about">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v6M5 8h6" />
                </svg>
              </span>
              <span>About</span>
            </a>

            <a className="sylva-dock-item" data-dock data-spec href="#focus">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M2 13l4-4 3 3 5-7" />
                </svg>
              </span>
              <span>Focus</span>
            </a>

            <a className="sylva-dock-item" data-dock data-spec href="#education">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M2 5l6-3 6 3-6 3-6-3z" />
                  <path d="M4 7v4c0 2 4 3 4 3s4-1 4-3V7" />
                </svg>
              </span>
              <span>Timeline</span>
            </a>

            <a className="sylva-dock-item" data-dock data-spec href="#projects">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <rect x="2" y="3" width="12" height="10" rx="2" />
                  <path d="M5 7h6M5 10h4" />
                </svg>
              </span>
              <span>Projects</span>
            </a>

            <a className="sylva-dock-item" data-dock data-spec href="#skills">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M8 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
                </svg>
              </span>
              <span>Skills</span>
            </a>

            <a className="sylva-dock-item" data-dock data-spec href="#contact">
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <rect x="2" y="3" width="12" height="10" rx="2" />
                  <path d="M2 5l6 4 6-4" />
                </svg>
              </span>
              <span>Contact</span>
            </a>

            {/* Academic CV Action Button */}
            <button
              onClick={onOpenResume}
              className="sylva-dock-item sylva-dock-item--cta"
              data-dock
              data-spec
              aria-label="View Academic Resume"
              title="Open Academic CV"
            >
              <span className="dock-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M4 2.4h5.3L12 5.1v8.5H4z" />
                  <path d="M9.2 2.4V5h2.7" />
                  <path d="M6 8.4h4M6 10.8h2.8" />
                </svg>
              </span>
              <span>CV / Resume</span>
            </button>
          </nav>
        </div>

        {/* ── Main Parallax Stage (1600 × 880 Canvas) ───────────────────── */}
        <div className="sylva-stage" id="sylva-stage">
          {/* Subtle column guide rules */}
          <div className="sylva-guides sylva-fade" style={{ '--d': '900ms' }} aria-hidden="true">
            <i style={{ left: 'calc(405 * var(--u))' }}></i>
            <i style={{ left: 'calc(748 * var(--u))' }}></i>
            <i style={{ left: 'calc(1091 * var(--u))' }}></i>
          </div>

          {/* Large ambient ghost wordmark */}
          <div className="sylva-ghost sylva-fade" style={{ '--d': '1150ms' }} aria-hidden="true">
            KASHAF
          </div>

          {/* Card 1: Student Positioning & Ethos */}
          <article
            className="sylva-card sylva-card--about sylva-mask"
            style={{ '--d': '760ms', '--pd': 10, '--pr': 2.2 }}
          >
            <figure className="sylva-portal">
              <span className="sylva-portal-media">
                <img
                  crossOrigin="anonymous"
                  src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/c74a626e396794aa239bca6f/card-ethos.jpg"
                  alt="Data and code foundation"
                  loading="eager"
                  decoding="async"
                />
              </span>
            </figure>
            <p className="card-label">Learning Ethos</p>
            <h2>Learn by building practical code.</h2>
          </article>

          {/* Floating Knob for Card 1 */}
          <span className="sylva-knob-float" style={{ '--pd': 10, '--pr': 2.2 }}>
            <a
              href="#about"
              className="sylva-knob sylva-knob--about sylva-mask-circle"
              style={{ '--d': '1100ms' }}
              aria-label="Read Kashaf's background and philosophy"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17l9.2-9.2M17 17V8H8" />
              </svg>
            </a>
          </span>

          {/* Hero Headline */}
          <h1 className="sylva-headline" style={{ '--pd': 18, '--pr': 1.2 }}>
            <span>
              <i style={{ '--d': '260ms' }}>Building with Data,</i>
            </span>
            <span>
              <i style={{ '--d': '360ms' }}>AI &amp; Technology</i>
            </span>
          </h1>

          {/* Hero Lede / Introduction */}
          <p className="sylva-lede sylva-mask" style={{ '--d': '480ms', '--pd': 14, '--pr': 1 }}>
            Sayyed Kashaf — B.Sc. Data Science student at Mumbai University turning data analysis,
            generative AI, and defensive cybersecurity into practical open-source solutions.
          </p>

          {/* Liquid Metal WebGL2 Primary Button */}
          <div className="sylva-pill-clip">
            <div
              className="sylva-pill sylva-mask"
              style={{ '--d': '600ms', '--pd': 15, '--pr': 1.4 }}
            >
              <div className="liquid-stage liquid-stage--explore" data-liquid-metal="explore">
                <div className="liquid-plate plate" aria-hidden="true"></div>
                <canvas className="liquid-fx" aria-hidden="true"></canvas>
                <a href="#projects" className="liquid-button liquid-button--explore btn">
                  <svg className="ico" viewBox="0 0 115 115" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="11" strokeLinecap="round">
                      <path d="M14 34.5 H101" />
                      <path d="M14 57.5 H101" />
                      <path d="M14 80.5 H68" />
                    </g>
                  </svg>
                  <span className="lbl">Explore Projects</span>
                </a>
              </div>
            </div>
          </div>

          {/* Liquid Metal Play Button (Opens Academic CV Preview) */}
          <span className="sylva-play-wrap" style={{ '--pd': 20 }}>
            <span className="sylva-play-clip">
              <span className="sylva-play-glass sylva-mask-circle" style={{ '--d': '900ms' }}>
                <span className="liquid-stage liquid-stage--play" data-liquid-metal="play">
                  <span className="liquid-plate plate" aria-hidden="true"></span>
                  <canvas className="liquid-fx" aria-hidden="true"></canvas>
                  <button
                    onClick={onOpenResume}
                    className="liquid-button liquid-button--play btn"
                    type="button"
                    aria-label="View Academic Resume"
                    title="Open Academic CV"
                  >
                    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5.2v13.6L19 12z" fill="currentColor" />
                    </svg>
                  </button>
                </span>
              </span>
            </span>
            <span
              className="sylva-play-ring sylva-mask-circle"
              style={{ '--d': '840ms' }}
              aria-hidden="true"
            ></span>
          </span>

          {/* Stat Counter A */}
          <dl
            className="sylva-stat sylva-stat--a sylva-mask"
            style={{ '--d': '700ms', '--pd': 12 }}
          >
            <span className="stat-mark" aria-hidden="true">
              <svg
                viewBox="0 0 30 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <circle cx="15" cy="15" r="10.5" strokeDasharray="0.6 3.6" />
                <circle cx="15" cy="15" r="5.6" strokeDasharray="0.6 3.2" />
                <circle cx="15" cy="15" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div>
              <dt>Degree Program</dt>
              <dd>B.Sc. Data Science '28</dd>
            </div>
          </dl>

          {/* Stat Counter B */}
          <dl
            className="sylva-stat sylva-stat--b sylva-mask"
            style={{ '--d': '770ms', '--pd': 13 }}
          >
            <span className="stat-mark" aria-hidden="true">
              <svg
                viewBox="0 0 30 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <g id="rays">
                  <path d="M15 3.5v5" />
                  <path d="M15 21.5v5" />
                  <path d="M3.5 15h5" />
                  <path d="M21.5 15h5" />
                  <path d="M6.9 6.9l3.5 3.5" />
                  <path d="M19.6 19.6l3.5 3.5" />
                  <path d="M23.1 6.9l-3.5 3.5" />
                  <path d="M10.4 19.6l-3.5 3.5" />
                </g>
                <circle cx="15" cy="15" r="3.6" />
              </svg>
            </span>
            <div>
              <dt>Public Repositories</dt>
              <dd>4+ Practical Projects</dd>
            </div>
          </dl>

          {/* Card 2: Featured Project Spotlight */}
          <article
            className="sylva-card sylva-card--stove sylva-mask"
            style={{ '--d': '880ms', '--pd': 22, '--pr': 2.4 }}
          >
            <p className="card-label">Featured AI Project</p>
            <h2>GlowMatch AI</h2>
            <figure className="sylva-portal">
              <span className="sylva-portal-media">
                <img
                  crossOrigin="anonymous"
                  src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/c74a626e396794aa239bca6f/card-ecostove.jpg"
                  alt="GlowMatch AI Vector recommendation showcase"
                  loading="eager"
                  decoding="async"
                />
              </span>
            </figure>
            <a
              href="https://github.com/sayyedkashaf/GlowMatch-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="sylva-knob"
              aria-label="View GlowMatch AI on GitHub"
              title="Open GlowMatch AI GitHub repository"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </article>

          {/* Scroll Cue to Sections Below */}
          <a
            className="sylva-scroll sylva-mask"
            style={{ '--d': '1040ms', '--pd': 9 }}
            href="#about"
          >
            Discover<span className="track"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SylvaHero;
