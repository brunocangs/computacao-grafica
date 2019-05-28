import {
  init,
  axes,
  degToRad,
  Point3D,
  download,
  upload,
  Title,
  controls as instructions
} from "../utils";
import {
  OrthographicCamera,
  Mesh,
  MeshBasicMaterial,
  Vector3,
  DoubleSide,
  PointLight,
  PlaneBufferGeometry,
  MeshStandardMaterial,
  Color,
  Euler,
  PCFSoftShadowMap,
  SphereGeometry
} from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { CircleGeometry } from "three";
import throttle from "lodash.throttle";
import { Group } from "three";
import { PerspectiveCamera } from "three";
import { Scene } from "three";
import { BoxGeometry } from "three";
import { Object3D } from "three";
import { Geometry } from "three";
import PointerLock from "three-pointerlock-ts";
import { AmbientLight } from "three";
import { Clock } from "three";
import PLYLoader from "three-ply-loader-ts";
import { CubeTextureLoader } from "three";

const loader = new PLYLoader();

let selectedPly: number = 0;

const materials: MeshStandardMaterial[] = [
  new MeshStandardMaterial({
    color: new Color().setHSL(1 / 6, 1, 0.5),
    roughness: 0.3,
    side: DoubleSide
  }),
  new MeshStandardMaterial({
    color: new Color().setHSL(316 / 360, 1, 0.4),
    roughness: 0.2,
    side: DoubleSide
  }),
  new MeshStandardMaterial({
    color: new Color().setHSL(82 / 360, 0.9, 0.3),
    roughness: 1,
    metalness: 0.1,
    side: DoubleSide
  }),
  new MeshStandardMaterial({
    color: new Color().setHSL(28.9 / 360, 0.566, 0.461),
    roughness: 0.6,
    metalness: 0.1,
    side: DoubleSide
  }),
  new MeshStandardMaterial({
    color: new Color().setHSL(278 / 460, 0.42, 0.47),
    roughness: 0.5,
    side: DoubleSide
  })
];
let currentMaterial = 0;
const plys = [
  {
    path: require("../models/third/street_lamp.ply"),
    rotation: new Euler(Math.PI / 2, 0, 0),
    translate: new Vector3(0, 0.048, 0),
    front: new Vector3(0, -1, 0),
    scale: 1.2,
    name: "Poste"
  },
  {
    path: require("../models/third/trashcan.ply"),
    rotation: new Euler(0, 0, 0),
    translate: new Vector3(0, 0, 0.02),
    scale: 0.3,
    front: new Vector3(0, -1, 0),
    name: "Lata de lixo"
  },
  {
    path: require("../models/third/stratocaster.ply"),
    rotation: new Euler(Math.PI / 2, 0, Math.PI / 4),
    translate: new Vector3(0, 0.05, 0),
    scale: 0.7,
    front: new Vector3(0, -1, 0),
    name: "Guitarra"
  },
  {
    path: require("../models/third/mug.ply"),
    rotation: new Euler(Math.PI / 2, 0, 0),
    translate: new Vector3(0, 0, 0),
    scale: 0.05,
    front: new Vector3(0, -1, 0),
    name: "Caneca"
  },
  {
    path: require("../models/third/turbine.ply"),
    rotation: new Euler(Math.PI / 2, 0, 0),
    translate: new Vector3(0, 0.02, 0),
    scale: 0.7,
    front: new Vector3(0, -1, 0),
    name: "Turbina"
  }
];
const plyMeshes: Group[] = [];
const placedPlys: Group[] = [];
plys.forEach((item, index) => {
  loader.load(item.path, geo => {
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    const mesh = new Mesh(
      geo,
      new MeshStandardMaterial({
        color: new Color().setHSL(
          Math.random(),
          0.3 + Math.random() * 0.3,
          0.3 + Math.random() * 0.3
        ),
        roughness: Math.random(),
        metalness: Math.random() * 0.3
      })
    );
    const scale = (item.scale * 0.1) / geo.boundingSphere.radius;
    mesh.setRotationFromEuler(item.rotation);
    mesh.translateX(item.translate.x);
    mesh.translateY(item.translate.y);
    mesh.translateZ(item.translate.z);
    mesh.scale.setScalar(scale);
    mesh.castShadow = true;
    const g = new Group();
    g.add(mesh);
    plyMeshes[index] = g;
  });
});
const addPly = (() => {
  // const;
  const modal = document.createElement("div");
  modal.setAttribute(
    "style",
    "position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,0.6); z-index: 99; display: none; flex-direction: column; align-items: center; justify-content: center"
  );
  const content = document.createElement("div");
  content.setAttribute(
    "style",
    "padding: 12px 16px; background-color: #f0f0f0; font-family: sans-serif; color: black;"
  );
  content.innerText = "Selecione um ply";
  modal.appendChild(content);
  plys.forEach((ply, index) => {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = ply.name;
    link.style.display = "block";
    link.onclick = e => {
      e.preventDefault();
      e.stopPropagation();
      selectedPly = index + 1;
      modal.style.display = "none";
    };
    content.appendChild(link);
  });
  document.body.appendChild(modal);
  return () => {
    modal.style.display = "flex";
  };
})();
const placePly = (x: number, y: number) => {
  const group = plyMeshes[selectedPly - 1].clone(true);
  group.position.set(x, y, 0);
  pScene.add(group);
  selectedPly = -selectedPly;
  return group;
};
const orientPly = (group: Group, x: number, y: number) => {
  // const children = group.children as Mesh[];
  const index = -selectedPly - 1;
  const direction = new Vector3(x, y)
    .sub(group.position.clone().setZ(0))
    .normalize();
  let angle = plys[index].front.angleTo(direction);
  if (x < group.position.x) {
    angle = Math.PI + (Math.PI - angle);
  }
  group.rotation.z = angle;
  group.userData.index = index;
  group.userData.x = x;
  group.userData.y = y;
};
const instructionElement = instructions({
  "1 a 5 ": "Materiais de grupo",
  "Setas dir/esq": "Muda grupo selecionado",
  "Setas cima/baixo": "Altera profundidade da seção",
  ", e . ": "Altera largura da seção",
  "s ": "Salva modelo atual",
  "l ": "Carrega um modelo salvo",
  "m ": "Alterna entre modo de edição e visualização",
  "p ": "Inserir um objeto PLY"
});
// Variáveis para movimento
const direction = new Vector3();
const clock = new Clock();
let isNavigation = false;

// Sintaxe de desestruturação de vetor, dado que retorno é uma tupla de variáveis
let [
  zScene,
  renderer,
  camera,
  { axisHeight, axisWidth, height, width }
] = init();
// Variáveis globais
let depth = 1;
let boxWidth = 1;
let currentGroup = 0;
const title = new Title("");
// Camera da primeira viewport
const zCamera = new OrthographicCamera(-1, 1, 1, -1, -1000, 10000);
// Camera da segunda viewport, com aspect ratio correto para meia tela
const halfAspect = (width / 2 - 2) / height;
const perspectiveCamera = new PerspectiveCamera(60, halfAspect, 0.2, 1000);
// Câmera e controles de primeira pessoa

const fpCamera = new PerspectiveCamera(
  60,
  (width - 2) / (height - 2),
  0.01,
  1000
);
const fpControls = new PointerLock(fpCamera);
const fpObject = fpControls.getObject();
fpObject.position.set(0, -0.8, 0.05);
fpObject.rotateX(degToRad(90));
const fpLight1 = new PointLight(0xffffff, 1, 10, 2);
fpLight1.castShadow = true;
fpLight1.shadow.camera.near = 0.01;
fpLight1.shadow.camera.far = 500;
fpLight1.shadow.mapSize.width = 1024;
fpLight1.shadow.mapSize.height = 1024;
const fpBallLight1 = new Object3D();
fpBallLight1.add(fpLight1);
fpBallLight1.add(
  new Mesh(
    new SphereGeometry(0.01),
    new MeshBasicMaterial({
      color: 0xffffff
    })
  )
);
fpBallLight1.position.set(1, 0, 0.7);
fpBallLight1.visible = false;
const fpBallLight2 = new Object3D();
fpBallLight2.add(fpLight1.clone(true));
fpBallLight2.add(
  new Mesh(
    new SphereGeometry(0.01),
    new MeshBasicMaterial({
      color: 0xffffff
    })
  )
);
fpBallLight2.position.set(-1, 0, 0.4);
fpBallLight2.visible = false;
const plane = new Mesh(
  new PlaneBufferGeometry(20, 20, 1, 1),
  new MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 1
  })
);
plane.visible = false;
plane.receiveShadow = true;
perspectiveCamera.position.set(1.3, 1.3, 1.3);
perspectiveCamera.lookAt(0, 0, 0);
// Configura cena 3D com luzes posicionadas na camera e a 120 graus de rotacao dela
const pScene = new Scene();
pScene.add(new AmbientLight(0xffffff));
const pLight = new PointLight(0xffffff, 1, 8, 2);
const pLight2 = new PointLight(0xffffff, 1, 8, 2);
pLight.position.copy(perspectiveCamera.position);
pLight2.position.copy(pLight.position);
pLight2.rotation.z = degToRad(120);
pScene.add(pLight);
pScene.add(pLight2);
pScene.add(fpControls.getObject());
pScene.add(fpBallLight1);
pScene.add(fpBallLight2);
pScene.add(plane);
// Adiciona eixos às cenas
zScene.add(axes());
const pAxes = axes();
pScene.add(pAxes);

// Cria grupos de controle e adiciona às telas
let perspectiveGroups = [new Group()];
let ortogonalGroups = [new Group()];
/**
 * Sintaxe de spread de vetor para parametro. Equivale a
 * zScene.add(ortogonalGroups[0], ortogonalGroups[1], ortogonalGroups[2])
 * pScene.add(perspectiveGroups[0], perspectiveGroups[1], perspectiveGroups[2])
 */
zScene.add(...ortogonalGroups);
pScene.add(...perspectiveGroups);
let pGroup = perspectiveGroups[currentGroup];
let zGroup = ortogonalGroups[currentGroup];

// Controles para a camera com mouse. Importado de [OrbitControls](https://threejs.org/docs/#examples/controls/OrbitControls)
const controls = new OrbitControls(
  perspectiveCamera,
  renderer.domElement,
  window
);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Settings do renderizador
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Loop de renderização
const render = () => {
  requestAnimationFrame(render);
  title.set(
    selectedPly !== 0
      ? selectedPly < 0
        ? "Clique novamente para orientar o objeto e esc para confirmar"
        : `Clique para posicionar ${plys[selectedPly - 1].name}`
      : `Grupo: ${currentGroup +
          1} - Profundidade: ${depth} - Largura: ${boxWidth} - Material ${currentMaterial}`
  );
  // Atualiza controles da camera e limpa buffers de cor
  controls.update();
  if (!isNavigation) {
    pLight2.position.copy(pLight.position);
    pLight.position.copy(perspectiveCamera.position);
    renderer.clear();
    // Viewport da camera ortográfica de x = 1 até x / 2 - 1
    renderer.setViewport(1, 1, width / 2 - 2, height);
    renderer.render(zScene, zCamera);
    // Viewport da camera em perpectiva de x / 2 + 1 até x - 1
    renderer.setViewport(width / 2 + 1, 1, width / 2 - 2, height);
    renderer.render(pScene, perspectiveCamera);
  } else {
    doMovement();
    renderer.setViewport(1, 1, width - 2, height - 2);
    renderer.render(pScene, fpCamera);
  }
};
render();

/**
 * Adiciona pontos parametrizados entre -1 e 1.
 * Criado para facilitar carregar arquivo para T1
 * @param points Vetor de pontos com [x,y,z]
 */
const addPoints = (points: [number, number, number, number][]) => {
  for (let point of points) {
    const [x, y, z, depth] = point;
    const geo = new CircleGeometry(0.01, 16);
    const mat = new MeshBasicMaterial({
      color: 0xffffff
    });
    const circle = new Mesh(geo, mat);
    // Posiciona círculo no click e adiciona à tela
    // @ts-ignore
    circle.width = depth;
    circle.position.x = x;
    circle.position.y = y;
    circle.position.z = z;
    zGroup.add(circle);
    // Seleciona os pontos dentro do grupo
    const dots = zGroup.children;
    // Adiciona retangulo na segunda cena se a primeira contiver mais de dois pontos
    if (dots.length >= 2) {
      // slice(-2) => Pega ultimos 2 vertices
      /**
       * [previous, current] = ...
       * Desestrutura o vetor em variáveis novas. Equivale à
       * const previous = dots.slice(-2)[0];
       * const current = dots.slice(-2)[1];
       */
      const [previous, current] = dots.slice(-2);
      // Vetor perpendicular aos cliques
      const perpendicular = getPerpendicular(
        previous.position,
        current.position
      );
      // Cria uma nova caixa na origem
      let geometry = new BoxGeometry(1, 1, 1, 1, 1);
      // Reposiciona vérices na posição desejada
      positionVertices(geometry, current, previous, perpendicular, depth);

      // Cria plano já reposicionado e adiciona à cena em perspectiva
      let material = materials[currentMaterial].clone();
      let box = new Mesh(geometry, material);
      box.receiveShadow = true;
      pGroup.add(box);
    }
  }
};

// Retorna o vetor perpendicular de módulo 0.02 a dois vetores
const getPerpendicular = (previous: Vector3, current: Vector3): Vector3 => {
  const perpendicular = new Vector3();
  // Calcula vetor deslocamento entre os dois cliques
  perpendicular.x = current.x - previous.x;
  perpendicular.y = current.y - previous.y;
  perpendicular.z = 0;
  // Rotaciona em 90° em relação à Z
  perpendicular.applyAxisAngle(new Vector3(0, 0, 1), degToRad(90));
  // Normaliza e coloca vetor com tamanho 0.05
  perpendicular.setLength(0.02);
  return perpendicular;
};

/**
 * Disposição dos vérices na geometria é:
 *                     ^ y
 *    4---1            | /
 *   /|  /|            |/
 *  5---0 3        ----/----> x
 *  | / |/            /|
 *  7---2            z |
 *
 * 6 'abaixo' de 4
 *
 * Utiliza 0-3 como base e extrude 4-7
 */
// Posiciona face frontal em Z = 0
const positionVertices = (
  geometry: Geometry,
  current: Object3D,
  previous: Object3D,
  perpendicular: Vector3,
  depth: number
) => {
  const { vertices } = geometry;
  /**
   *    5-prv-0  Face frontal
   *    |  |  |
   *    |  v  |
   *    7-crr-2
   */
  // Base de cima
  vertices[0].x = previous.position.x + perpendicular.x * depth;
  vertices[0].y = previous.position.y + perpendicular.y * depth;
  vertices[0].z = 0;
  vertices[5].x = previous.position.x - perpendicular.x * depth;
  vertices[5].y = previous.position.y - perpendicular.y * depth;
  vertices[5].z = 0;
  // Base de baixo
  vertices[2].x = current.position.x + perpendicular.x * depth;
  vertices[2].y = current.position.y + perpendicular.y * depth;
  vertices[2].z = 0;
  vertices[7].x = current.position.x - perpendicular.x * depth;
  vertices[7].y = current.position.y - perpendicular.y * depth;
  vertices[7].z = 0;
  /**
   *    4-prv-1  Face anterior
   *    |  |  |
   *    |  v  |
   *    6-crr-3
   */
  // Posiciona outra face em Z = altura
  // Base de cima
  vertices[1].x = previous.position.x + perpendicular.x * depth;
  vertices[1].y = previous.position.y + perpendicular.y * depth;
  vertices[1].z = previous.position.z;
  vertices[4].x = previous.position.x - perpendicular.x * depth;
  vertices[4].y = previous.position.y - perpendicular.y * depth;
  vertices[4].z = previous.position.z;
  // Base de baixo
  vertices[3].x = current.position.x + perpendicular.x * depth;
  vertices[3].y = current.position.y + perpendicular.y * depth;
  vertices[3].z = current.position.z;
  vertices[6].x = current.position.x - perpendicular.x * depth;
  vertices[6].y = current.position.y - perpendicular.y * depth;
  vertices[6].z = current.position.z;
  geometry.computeFaceNormals();
  geometry.computeBoundingBox();
  adjustPreviousBox(geometry, previous);
  geometry.computeBoundingSphere();
};
/**
 * Ajusta face de baixo do paralelepipedo anterior, se existir
 */

// Algoritmo para calcular interseção de duas retas. Obtido de http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
const checkLineIntersection = (
  line1StartX: number,
  line1StartY: number,
  line1EndX: number,
  line1EndY: number,
  line2StartX: number,
  line2StartY: number,
  line2EndX: number,
  line2EndY: number
): Point3D => {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  let denominator,
    a,
    b,
    numerator1,
    numerator2,
    x = line1StartX,
    y = line1StartY;
  denominator =
    (line2EndY - line2StartY) * (line1EndX - line1StartX) -
    (line2EndX - line2StartX) * (line1EndY - line1StartY);
  if (denominator == 0) {
    return [0, 0, 0];
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
  numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  x = line1StartX + a * (line1EndX - line1StartX);
  y = line1StartY + a * (line1EndY - line1StartY);
  /*
      // it is worth noting that this should be the same as:
      x = line2StartX + (b * (line2EndX - line2StartX));
      y = line2StartX + (b * (line2EndY - line2StartY));
      */
  // if line1 and line2 are segments, they intersect if both of the above are true
  return [x, y, 0];
};

// Extende as faces até seu ponto de interseção para evitar mudanças estranhas
const adjustPreviousBox = (cGeo: Geometry, prev: Object3D) => {
  const [prevBox] = pGroup.children.slice(-1) as Mesh[];
  if (!prevBox) return;
  const pGeo = prevBox.geometry as Geometry;
  const pVert = pGeo.vertices;
  const pDir = new Vector3().subVectors(pVert[0], pVert[2]);
  const cVert = cGeo.vertices;
  const cDir = new Vector3().subVectors(cVert[0], cVert[2]);
  const intersect02 = checkLineIntersection(
    pVert[0].x,
    pVert[0].y,
    pVert[0].x + pDir.x,
    pVert[0].y + pDir.y,
    cVert[0].x,
    cVert[0].y,
    cVert[0].x + cDir.x,
    cVert[0].y + cDir.y
  );
  const intersect57 = checkLineIntersection(
    pVert[5].x,
    pVert[5].y,
    pVert[5].x + pDir.x,
    pVert[5].y + pDir.y,
    cVert[5].x,
    cVert[5].y,
    cVert[5].x + cDir.x,
    cVert[5].y + cDir.y
  );
  pVert[3].set(
    ...(pVert[2]
      .set(...intersect02)
      .clone()
      .setZ(pVert[3].z)
      .toArray() as Point3D)
  );
  pVert[6].set(
    ...(pVert[7]
      .set(...intersect57)
      .clone()
      .setZ(pVert[6].z)
      .toArray() as Point3D)
  );
  cVert[1].set(
    ...(cVert[0]
      .set(...intersect02)
      .clone()
      .setZ(cVert[1].z)
      .toArray() as Point3D)
  );
  cVert[4].set(
    ...(cVert[5]
      .set(...intersect57)
      .clone()
      .setZ(cVert[4].z)
      .toArray() as Point3D)
  );
  pGeo.verticesNeedUpdate = true;
  pGeo.computeBoundingBox();
  pGeo.computeBoundingSphere();
  pGeo.computeFaceNormals();
};

// Salva a informação dos groupos e potos atuais como JSON
const saveData = () => {
  // Group
  const walls = ortogonalGroups.map(group => {
    return (
      group.children
        // Clique
        .map(dot => {
          // @ts-ignore
          return [...dot.position.toArray(), dot.width];
        })
        .filter(item => item.length > 0)
    );
  });
  const plys = placedPlys.map(item => {
    return [
      item.userData.index,
      item.position.x,
      item.position.y,
      item.userData.x,
      item.userData.y
    ];
  });
  download(
    {
      walls,
      plys
    },
    "model.json"
  );
};

// Carrega a informação salva anteriormente para a lógica interna do programa
const loadData = (data: string) => {
  for (let i in ortogonalGroups) {
    zScene.remove(ortogonalGroups[i]);
    pScene.remove(perspectiveGroups[i]);
  }
  for (let grp of placedPlys) {
    pScene.remove(grp);
  }
  ortogonalGroups = [];
  perspectiveGroups = [];
  currentGroup = -1;
  const { walls, plys } = JSON.parse(data) as {
    walls: [number, number, number, number][][];
    plys: [number, number, number, number, number][];
  };
  for (let group of walls) {
    const next = currentGroup + 1;
    ortogonalGroups.push(new Group());
    perspectiveGroups.push(new Group());
    zScene.add(ortogonalGroups[next]);
    pScene.add(perspectiveGroups[next]);
    if (next === 0) {
      zGroup = ortogonalGroups[next];
      pGroup = perspectiveGroups[next];
      currentGroup++;
    } else {
      updateGroups(next);
    }
    boxWidth = depth || 1;
    addPoints(group);
  }
  for (let ply of plys) {
    const [index, x, y, clickX, clickY] = ply;
    selectedPly = index + 1;
    placedPlys.push(placePly(x, y));
    orientPly(placedPlys.slice(-1)[0], clickX, clickY);
  }
};

const switchMode = () => {
  isNavigation = !isNavigation;
  perspectiveCamera.aspect = isNavigation ? width / height : halfAspect;
  perspectiveCamera.updateProjectionMatrix();
  title.toggleVisibility();
  instructionElement.style.visibility = isNavigation ? "hidden" : "visible";
  controls.enabled = !isNavigation;
  pAxes.children.forEach(child => (child.visible = !isNavigation));
  plane.visible = !plane.visible;
  fpBallLight1.visible = !fpBallLight1.visible;
  fpBallLight2.visible = !fpBallLight2.visible;
  pLight.visible = !pLight.visible;
  pLight2.visible = !pLight2.visible;
};
fpControls.addEventListener("unlock", () => {
  switchMode();
});
fpControls.addEventListener("lock", () => {
  switchMode();
});
let moveForward = false;
let moveLeft = false;
let moveBack = false;
let moveRight = false;
const handleMovement = (key: string, bool: boolean) => {
  switch (key) {
    case "w":
    case "ArrowUp":
      moveForward = bool;
      break;
    case "s":
    case "ArrowDown":
      moveBack = bool;
      break;
    case "a":
    case "ArrowLeft":
      moveLeft = bool;
      break;
    case "d":
    case "ArrowRight":
      moveRight = bool;
      break;
  }
};
const doMovement = () => {
  direction.z = Number(moveBack) - Number(moveForward);
  direction.x = Number(moveRight) - Number(moveLeft);
  const length = 0.02 * clock.getDelta() * 15;
  direction.setLength(length);
  // // Verifica colisao para frente
  // let look = new Vector3();
  // look = fpControls.getDirection();
  // look.applyEuler(new Euler(Math.PI / 2, 0, 0));
  // look.z = 0;
  // look.normalize();
  // // Look contem posição para frente
  // const objects = perspectiveGroups.reduce<Object3D[]>((prev, curr) => {
  //   return prev.concat(curr.children);
  // }, []);
  fpObject.translateX(direction.x);
  fpObject.translateZ(direction.z);
};
// Eventos mouse/teclado

// Clique na tela
function onMouseDown(event: MouseEvent) {
  if (isNavigation) return;
  /**
   * Botões (event.which):
   * 1 - Botão esquerdo
   * 2 - Botão do meio
   * 3 - Botão direito
   */
  // Se botão usado for 3, chame o handler correto
  if (event.which === 3) return onRightClick(event);
  // Normaliza clique de -1 a 1 na tela inteira
  let x = (event.clientX / window.innerWidth) * 2 - 1;
  // Orientação de Y é de baixo para cima
  let y = -(event.clientY / window.innerHeight) * 2 + 1;
  // Se clique é na primeira metade,  -1 <= x <= 0
  if (x < 0) {
    // Re-normaliza intervalo [-1, 0] pra [-1, 1]
    x = (x + 0.5) * 2;
    // Cria o ponto da cena ortográfica
    /**
     * Já deixa o ponto posicionado em Z para referenciar depois, como camera é Ortográfica
     * o que aparece na tela é igual, porém facilita para construir os quadrados com alturas
     * diferentes a seguir
     */
    if (selectedPly !== 0) {
      if (selectedPly < 0) {
        orientPly(placedPlys.slice(-1)[0], x, y);
      } else {
        placedPlys.push(placePly(x, y));
      }
    } else {
      addPoints([[x, y, 0.1 * depth, boxWidth]]);
    }
  }
}

const onRightClick = (e: MouseEvent) => {
  // Remove o ponto da primeira cena e deleta sua geometria
  const dots = zGroup.children;
  // Pega o ultimo elemento, slice() retorna um vetor
  const lastChild = dots.slice(-1)[0] as Mesh;
  if (!lastChild) return;
  zGroup.remove(lastChild);
  // Deleta a geometria para liberar memória
  lastChild.geometry.dispose();

  // Remove plano da segunda cena e deleta sua geometria tal como acima
  const planes = pGroup.children;
  // Conflitos de tipo
  const lastPlane = planes.slice(-1)[0] as Mesh;
  if (!lastPlane) return;
  pGroup.remove(lastPlane);
  lastPlane.geometry.dispose();
};

/**
 * Atualiza as cores dos pontos e faces dos quadrados para mostrar qual grupo está selecionado atualmente
 * @param next Indice do próximo grupo
 */
const updateGroups = (next: number) => {
  // const prev = currentGroup;
  // ortogonalGroups[prev].children.forEach(child => {
  //   const obj = child as Mesh;
  //   const mat = obj.material as MeshPhongMaterial;
  //   mat.color.setHSL(0, 0, 0.2);
  // });
  // ortogonalGroups[next].children.forEach(child => {
  //   const obj = child as Mesh;
  //   const mat = obj.material as MeshPhongMaterial;
  //   mat.color.setHSL(0, 0, 1);
  // });
  // perspectiveGroups[prev].children.forEach(child => {
  //   const obj = child as Mesh;
  //   const mat = obj.material as MeshPhongMaterial;
  //   mat.color.setHSL(60 / 360, 1, 0.2);
  // });
  // perspectiveGroups[next].children.forEach(child => {
  //   const obj = child as Mesh;
  //   const mat = obj.material as MeshPhongMaterial;
  //   mat.color.setHex(0xffff00);
  // });
  zGroup = ortogonalGroups[next];
  pGroup = perspectiveGroups[next];
  currentGroup = next;
};

const onKeydown = (e: KeyboardEvent) => {
  e.stopPropagation();
  const key = e.key;
  if (selectedPly < 0) selectedPly = 0;
  if (!isNavigation) {
    switch (key) {
      case "ArrowLeft":
        // Volta uma cena e atualiza variável global
        const next =
          // Controle de limite e evitando numero negativo
          (currentGroup - 1 + perspectiveGroups.length) %
          perspectiveGroups.length;
        updateGroups(next);
        break;
      case "ArrowRight":
        // Avança nas cenas e atualiza variável global
        const nextR = currentGroup + 1;
        if (nextR === perspectiveGroups.length) {
          ortogonalGroups.push(new Group());
          perspectiveGroups.push(new Group());
        }
        zScene.add(ortogonalGroups[nextR]);
        pScene.add(perspectiveGroups[nextR]);
        updateGroups(nextR);
        break;
      // Casos abaixos alteram profundidade
      case "ArrowUp":
        depth = ++depth % 10 || 1;
        break;
      case "ArrowDown":
        depth = (--depth + 10) % 10 || 9;
        break;
      case ".":
        boxWidth = ++boxWidth % 10 || 1;
        break;
      case ",":
        boxWidth = (--boxWidth + 10) % 10 || 9;
        break;
      case "F12":
        e.preventDefault();
        if (document.fullscreen) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        break;
      case "l":
        upload().then(loadData);
        break;
      case "s":
        saveData();
        break;
      case "m":
        fpControls.lock();
        break;
      case "p":
        addPly();
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        currentMaterial = Number(key) - 1;
        // @ts-ignore
        console.log(materials[currentMaterial].color);
        for (let child of pGroup.children as Mesh[]) {
          const material = child.material as MeshStandardMaterial;
          material.copy(materials[currentMaterial].clone());
          material.needsUpdate = true;
        }
        break;
    }
  } else {
    switch (key) {
      case "m":
        fpControls.unlock();
        break;
      default:
        handleMovement(key, true);
    }
  }
};

const onKeyup = (event: KeyboardEvent) => {
  if (isNavigation) {
    handleMovement(event.key, false);
  }
};

const basicOnMouseWheel = (e: Event) => {
  if (isNavigation) return;
  // Obtem posições atuais da camera
  // Sintaxe de desconstrução de objeto. Equivale à
  /**
   * const x = perspectiveCamera.position.x;
   * const y = perspectiveCamera.position.y;
   * const z = perspectiveCamera.position.z;
   */
  const { x, y, z } = perspectiveCamera.position;
  // Conflito de tipo
  if ((e as WheelEvent).deltaY < 0) {
    // Afasta em 5%
    perspectiveCamera.position.set(x * 1.05, y * 1.05, z * 1.05);
  } else {
    // Aproxima em 5%
    perspectiveCamera.position.set(x * 0.95, y * 0.95, z * 0.95);
  }
};

// Limita chamadas de evento a 60 fps para scroll mais natural. Função importada de [lodash.throttle](https://lodash.com/docs/4.17.11#throttle)
const onMouseWheel = throttle(basicOnMouseWheel, 1000 / 60);

const onWindowResize = () => {
  height = window.innerHeight;
  width = window.innerWidth;
  const halfAspect = (width / 2 - 2) / height;
  perspectiveCamera.aspect = halfAspect;
  perspectiveCamera.updateProjectionMatrix();
  fpCamera.aspect = (width - 2) / (height - 2);
  fpCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onWindowResize, false);
renderer.domElement.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("keydown", onKeydown, false);
window.addEventListener("keyup", onKeyup, false);
window.addEventListener("mousewheel", onMouseWheel, false);
