import {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import {API_URL} from "../config";

function CoursePanel() {
    const [courseName, setCourseName] = useState("");
    const [lecturers, setLecturers] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedLecturerId, setSelectedLecturerId] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchCourses();
    }, []);

    async function fetchUsers() {
        try {
            const [lecturersRes, studentsRes] = await Promise.all([
                fetch(`${API_URL}/users/lecturers`),
                fetch(`${API_URL}/users/students`)
            ]);

            if (lecturersRes.ok && studentsRes.ok) {
                setLecturers(await lecturersRes.json());
                setStudents(await studentsRes.json());
            }
        } catch (error) {
            console.error("Błąd podczas pobierania użytkowników:", error);
        }
    }

    async function fetchCourses() {
        try {
            const response = await fetch(`${API_URL}/courses`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            } else {
                console.error("Nie udało się pobrać kursów.");
            }
        } catch (error) {
            console.error("Błąd podczas pobierania kursów:", error);
        }
    }

    async function handleAddCourse() {
        try {
            const lecturer = lecturers.find(l => l.id.toString() === selectedLecturerId);
            const student = students.find(s => s.id.toString() === selectedStudentId);

            if (!lecturer || !student || !courseName) {
                console.error("Brakuje wymaganych danych.");
                return;
            }

            const encodedName = encodeURIComponent(courseName);

            const response = await fetch(
                `${API_URL}/courses/${encodedName}/${selectedLecturerId}/${selectedStudentId}`,
                {
                    method: "POST"
                }
            );

            if (response.ok) {
                console.log("Dodano kurs.");
                await fetchCourses();
                setCourseName("");
                setSelectedLecturerId(null);
                setSelectedStudentId(null);
            } else {
                console.error("Nie udało się dodać kursu.");
            }
        } catch (error) {
            console.error("Błąd przy dodawaniu kursu:", error);
        }
    }

    return (
        <div className="p-4">
            <div className="row mb-4">
                <div className="col">
                    <h1>Dodaj kurs</h1>
                </div>
                <div className="col text-end">
                    <Popup trigger={<button className="btn btn-lg btn-primary">Dodaj kurs</button>} modal nested>
                        {close => (
                            <div className="p-3">
                                <h2>Nowy kurs</h2>
                                <hr/>
                                <div className="mb-3">
                                    <label><b>Nazwa kursu:</b></label>
                                    <input type="text" className="form-control"
                                           onChange={(e) => setCourseName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label><b>Prowadzący:</b></label>
                                    <select className="form-select"
                                            onChange={(e) => setSelectedLecturerId(e.target.value)}>
                                        <option value="">-- Wybierz prowadzącego --</option>
                                        {lecturers.map(lecturer => (
                                            <option key={lecturer.id} value={lecturer.id}>
                                                {lecturer.firstName} {lecturer.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label><b>Starosta:</b></label>
                                    <select className="form-select"
                                            onChange={(e) => setSelectedStudentId(e.target.value)}>
                                        <option value="">-- Wybierz starostę --</option>
                                        {students.map(student => (
                                            <option key={student.id} value={student.id}>
                                                {student.firstName} {student.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            handleAddCourse();
                                            close();
                                        }}
                                        disabled={!courseName || !selectedLecturerId || !selectedStudentId}
                                    >
                                        Dodaj
                                    </button>
                                    <button className="btn btn-secondary" onClick={close}>Anuluj</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>

            <hr/>

            <div>
                <h2>Lista kursów</h2>
                {courses.length === 0 ? (
                    <p>Brak kursów.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Nazwa kursu</th>
                            <th>Prowadzący</th>
                            <th>Starosta</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.lecturer?.firstName} {course.lecturer?.lastName}</td>
                                <td>{course.studentRep?.firstName} {course.studentRep?.lastName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default CoursePanel;